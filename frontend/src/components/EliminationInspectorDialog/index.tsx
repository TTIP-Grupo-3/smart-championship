import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { FC } from 'react';
import { useTheme } from '@mui/material';

export const EliminationInspectorDialog: FC<any> = ({ open, setOpen }) => {
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog maxWidth="xs" open={open} style={{ borderRadius: 4 }} PaperProps={{ elevation: 24 }}>
        <DialogContent>
          <DialogContentText style={{ color: theme.palette.common.white }}>
            En torneos de eliminación no puede existir empate
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleClose}
            style={{ color: 'orange', borderColor: 'orange' }}
          >
            Entendido
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
