import { Button, Grid } from '@mui/material';
import { FC, useState } from 'react';
import { DialogAnotation } from '../DialogAnotation';
import { useStyles } from './style';

export const AnotationVeedor: FC<any> = ({
  buttonRightChild,
  buttonLeftChild,
  buttonRightAction,
  buttonLeftAction,
  buttonLeftProps,
  buttonRightProps,
}) => {
  const { classes } = useStyles();
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<any>();

  const openDialog = (actionbutton: () => void) => {
    setAction(actionbutton);
    setOpen(true);
  };
  const closeDialog = (id?: number) => {
    if (!id) return setOpen(false);
    const { args, function: cb } = action;
    cb(...args, id);
    setOpen(false);
  };
  return (
    <Grid className={classes.gridContainer}>
      <Button
        className={classes.buttonAdd}
        {...buttonLeftProps}
        onClick={() => openDialog(buttonLeftAction)}
      >
        {buttonLeftChild}
      </Button>
      <Grid style={{ width: '2%' }}></Grid>
      <Button
        className={classes.buttonRemove}
        {...buttonRightProps}
        onClick={() => openDialog(buttonRightAction)}
      >
        {buttonRightChild}
      </Button>
      <DialogAnotation items={action?.items ?? []} open={open} onClose={closeDialog} />
    </Grid>
  );
};
