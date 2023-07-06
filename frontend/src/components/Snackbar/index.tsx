/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Button, CircularProgress, Grid, Snackbar, SnackbarOrigin } from '@mui/material';
import { FC, ReactElement } from 'react';
import { useStyles } from './style';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
export interface State extends SnackbarOrigin {
  open: boolean;
}
export enum MessagesType {
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading',
}
export type MessageType = 'success' | 'error' | 'loading';

type TypeSnackBar = {
  // eslint-disable-next-line no-unused-vars
  [key in MessageType]: ReactElement;
};

export interface ActionData {
  msgButton: string;
}
export interface PropsSnackBar {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
  open: boolean;
  handleClose: () => void;
  msgSnack: string;
  msgLoading?: string;
  type: MessageType;
  action?: ActionData;
  'data-testid'?: string;
}

const SnackBar: FC<PropsSnackBar> = (props) => {
  const { classes, cx } = useStyles();
  const { vertical, horizontal, open, type, action, handleClose, msgSnack, msgLoading } = props;
  const selectIcon: TypeSnackBar = {
    success: <CheckCircleIcon className={cx(classes.icon, classes.success)} />,
    error: <ErrorIcon className={cx(classes.icon, classes.error)} />,
    loading: <CircularProgress size={21} className={cx(classes.icon, classes.loading)} />,
  };

  const message = (): ReactElement => {
    if (type === MessagesType.LOADING) {
      return (
        <>
          <div className={classes.colorInitial}>{msgLoading}</div>
          <div className={classes.withColor}> {msgSnack}</div>
        </>
      );
    }
    return <div className={classes.distance}> {msgSnack}</div>;
  };

  const actionButton = action && (
    <Button className={classes.colorButton} onClick={() => {}}>
      {action.msgButton}
    </Button>
  );

  const iconAndMessage: ReactElement = (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {selectIcon[type]}
      {message()}
    </Grid>
  );

  return (
    <div data-testid="snackbar">
      <Snackbar
        autoHideDuration={type === MessagesType.LOADING ? null : 4000}
        ContentProps={{
          'aria-describedby': 'message-id',
          className: classes.content,
        }}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={() => handleClose()}
        message={iconAndMessage}
        key={vertical + horizontal}
        action={actionButton}
      />
    </div>
  );
};
export default SnackBar;
