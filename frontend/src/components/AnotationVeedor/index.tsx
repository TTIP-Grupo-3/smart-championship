import { Button, Grid } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import { FC, useState } from 'react';
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
    setOpen(true);
    setAction(actionbutton);
  };
  const closeDialog = () => {
    setOpen(false);
    action();
  };
  return (
    <Grid
      style={{
        display: 'flex',
        flexGrow: 2,
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 0,
        margin: 0,
      }}
    >
      <Button
        style={{
          backgroundColor: red[500],
          color: 'white',
          width: '40%',
          fontFamily: 800,
          fontSize: 20,
        }}
        {...buttonLeftProps}
        onClick={buttonLeftAction}
      >
        {buttonLeftChild}
      </Button>
      <Grid style={{ width: '2%' }}></Grid>
      <Button
        style={{
          backgroundColor: blue[500],
          color: 'white',
          width: '40%',
          fontFamily: 800,
          fontSize: 20,
        }}
        {...buttonRightProps}
        onClick={buttonRightAction}
      >
        {buttonRightChild}
      </Button>
    </Grid>
  );
};
