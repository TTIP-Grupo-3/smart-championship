import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DialogTitle, Typography, useTheme } from '@mui/material';

export const ConfirmationReceiptDialog: FC<any> = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
    navigate('/leader');
  };

  return (
    <React.Fragment>
      <Dialog open={open} style={{ borderRadius: 4, width: 'auto' }} PaperProps={{ elevation: 24 }}>
        <DialogTitle style={{ color: theme.palette.common.white }}>Comprobante de pago</DialogTitle>
        <DialogContent style={{ flexDirection: 'row', display: 'flex' }}>
          <CheckCircleIcon style={{ fill: 'lightgreen', display: 'flex', paddingRight: 4 }} />

          <Typography style={{ color: ' white', display: 'flex' }}>
            El comprobante ha sido enviado con éxito y esta en evaluación, puedes seguir su estado
            seleccionando "Mis inscripciones" en la pantalla de inicio de tu cuenta
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleClose}
            style={{ color: 'lightblue', borderColor: 'lightblue' }}
          >
            Entendido
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
