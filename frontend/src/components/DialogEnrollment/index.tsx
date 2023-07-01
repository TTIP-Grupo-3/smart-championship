import Dialog from '@mui/material/Dialog';
import { FC, useEffect, useState } from 'react';
import { Button, DialogActions, DialogContent, Grid } from '@mui/material';
import { useStyles } from './style';
import Scroll from '../Scroll';
import { BootstrapDialogTitle } from '../DialogTitle';
import { API_ADMIN_ENROLLMENT } from '../../services/AdminEnrollment';

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onError: () => void;
  championshipId: number;
  idEnroll: number;
}

export const DialogEnrollment: FC<SimpleDialogProps> = ({
  onClose,
  open,
  onSuccess,
  onError,
  championshipId,
  idEnroll,
}) => {
  const { classes } = useStyles();
  const [enroll, setEnroll] = useState<any>();
  const handleClose = () => {
    onClose();
  };

  const confirmEnrollment = () => {
    API_ADMIN_ENROLLMENT.confirmEnrollment(championshipId, idEnroll).then(onSuccess).catch(onError);
  };

  const rejectEnrollment = () => {
    API_ADMIN_ENROLLMENT.rejectEnrollment(championshipId, idEnroll).then(onSuccess).catch(onError);
  };

  useEffect(() => {
    API_ADMIN_ENROLLMENT.getAdminEnrollment(championshipId, idEnroll).then((r: any) => setEnroll(r.data));
  }, []);

  return (
    <Dialog onClose={handleClose} open={open} classes={{ paper: classes.dialogPaper }}>
      <BootstrapDialogTitle onClose={onClose} className={classes.title}>
        Comprobante de pago
      </BootstrapDialogTitle>
      <Scroll className={classes.scroll}>
        <DialogContent classes={{ root: classes.content }}>
          <Grid container justifyContent="center" alignItems="center">
            <img
              loading="lazy"
              src={enroll?.receipt ? `data:image/png;base64,${enroll?.receipt}` : ''}
              className={classes.recipt}
            />
          </Grid>
        </DialogContent>
      </Scroll>
      <DialogActions>
        {!(enroll?.status === 'paid' || enroll?.status == 'rejected') && (
          <>
            {' '}
            <Button className={classes.buttonConfirm} onClick={confirmEnrollment}>
              Confirmar
            </Button>
            <Button className={classes.buttonDecline} onClick={rejectEnrollment}>
              Rechazar
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};
