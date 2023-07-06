import { useMemo, useState } from 'react';
import SnackBar, { MessagesType } from '../components/Snackbar';

export const useSnackbar = (vertical?: any, horizontal?: any) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<MessagesType>(MessagesType.LOADING);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (message: string, type: MessagesType) => {
    setMessage(message);
    setType(type);
    setOpen(true);
  };

  const onSuccess = async (message: string) => {
    handleOpen(message, MessagesType.SUCCESS);
  };

  const onError = (message: string) => {
    handleOpen(message, MessagesType.ERROR);
  };

  const onLoad = (message: string) => {
    handleOpen(message, MessagesType.LOADING);
  };

  const promise = (promise: Promise<any>, { loading, success, error }: any) => {
    onLoad(loading);
    promise
      .then((result) => {
        callifFunctionOrMessage(success, onSuccess, result, success);
      })
      .catch((err) => {
        callifFunctionOrMessage(error, onError, err, error);
      });
  };

  const callifFunctionOrMessage = (fn: any, fnToMessage: any, result: any, message: string) => {
    if (typeof fn === 'function') {
      return fn(result);
    } else {
      return fnToMessage(message);
    }
  };

  const Snack = useMemo(
    () => () =>
      (
        <SnackBar
          type={type}
          vertical={vertical ?? 'bottom'}
          horizontal={horizontal ?? 'center'}
          msgSnack={message}
          {...{ open, handleClose }}
        />
      ),
    [open, type],
  );

  return { Snack, onError, onSuccess, onLoad, promise };
};
