import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { FC } from 'react';
import { Typography, useTheme } from '@mui/material';
import { TeamEnrollmentCard } from '../TeamEnrollmentCard';
import { useStyles } from './style';
import { BootstrapDialogTitle } from '../DialogTitle';
import { Enrollment } from '../../interfaces';

export const MyEnrollmentsDialog: FC<any> = ({ open, setOpen, enrollments = [] }) => {
  const { classes } = useStyles();
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        className={classes.dialog}
        PaperProps={{ elevation: 24, className: classes.paper }}
      >
        <BootstrapDialogTitle
          style={{ color: theme.palette.common.white, paddingLeft: 31 }}
          onClose={handleClose}
        >
          Mis Inscripciones
        </BootstrapDialogTitle>
        <DialogContent style={{ flexDirection: 'column', display: 'flex' }}>
          {enrollments.map((enrollment: Enrollment) => (
            <TeamEnrollmentCard
              key={enrollment.id}
              tournamentRequested={enrollment?.championship.name}
              typeChampionship={enrollment?.championship.type === 'score' ? 'Clasificación' : 'Eliminación'}
              {...enrollment}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={classes.buttonClose}>
            <Typography className={classes.buttonText}>Cerrar</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
