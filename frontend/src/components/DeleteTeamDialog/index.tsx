import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { FC } from 'react';
import { useStyles } from './style';

export const DeleteTeamDialog: FC<any> = ({ open, onClose, onConfirmDelete }) => {
  const { classes } = useStyles();

  return (
    <React.Fragment>
      <Dialog maxWidth="xs" open={open} style={{ borderRadius: 4 }} PaperProps={{ elevation: 24 }}>
        <DialogContent>
          <DialogContentText className={classes.text}>
            Desea eliminar a los jugadores del equipo seleccionado?, esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose} style={{ color: 'white' }}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={onConfirmDelete} style={{ color: 'white' }}>
            Entendido
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
