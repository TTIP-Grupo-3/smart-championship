import Dialog from '@mui/material/Dialog';
import { FC } from 'react';
import { Button, DialogActions, DialogContent, Grid } from '@mui/material';
import { useStyles } from './style';
import comprobante from '../../comprobante.png';
import Scroll from '../Scroll';
import { BootstrapDialogTitle } from '../DialogTitle';

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

export const DialogInscription: FC<SimpleDialogProps> = ({ onClose, open }) => {
  const { classes } = useStyles();

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} classes={{ paper: classes.dialogPaper }}>
      <BootstrapDialogTitle onClose={onClose} className={classes.title}>
        Comprobante de pago
      </BootstrapDialogTitle>
      <Scroll className={classes.scroll}>
        <DialogContent classes={{ root: classes.content }}>
          <Grid container justifyContent="center" alignItems="center">
            <img src={comprobante} className={classes.recipt} />
          </Grid>
        </DialogContent>
      </Scroll>
      <DialogActions>
        <Button className={classes.buttonConfirm} onClick={onClose}>
          Confirmar
        </Button>
        <Button className={classes.buttonDecline} onClick={onClose}>
          Rechazar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
