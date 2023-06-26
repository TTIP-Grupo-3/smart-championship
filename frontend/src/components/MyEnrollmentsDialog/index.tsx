import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { FC } from 'react';
import { Typography } from '@mui/material';
import { TeamEnrollmentCard } from '../TeamEnrollmentCard';
import { useStyles } from './style';
import { BootstrapDialogTitle } from '../DialogTitle';

export const MyEnrollmentsDialog: FC<any> = ({ open, setOpen }) => {
  const { classes } = useStyles();
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        style={{ borderRadius: 4, width: '100%' }}
        PaperProps={{ elevation: 24, style: { width: '90vw', height: '72vh' } }}
      >
        <BootstrapDialogTitle style={{ color: 'white', paddingLeft: 31 }} onClose={handleClose}>
          Mis Inscripciones
        </BootstrapDialogTitle>
        <DialogContent style={{ flexDirection: 'column', display: 'flex' }}>
          <TeamEnrollmentCard
            id={1}
            status={'approved'}
            tournamentRequested="To Start Championship"
            type="Clasificacion"
          />
          <TeamEnrollmentCard
            id={2}
            status={'rejected'}
            tournamentRequested="Other Championship"
            type="Elimination"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ backgroundColor: '#00BCD4', borderRadius: 4 }}>
            <Typography className={classes.buttonText}>Cerrar</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
