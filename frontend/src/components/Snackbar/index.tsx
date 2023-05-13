import { Alert, Snackbar } from '@mui/material';
import { FC } from 'react';

export const ErrorLogin: FC<any> = ({ open, handleClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={handleClose}
    sx={{
      '&.MuiSnackbar-root': {
        position: 'relative',
        right: 0,
        top: 0,
        left: 0,
        bottom: 0,

        marginTop: '20px',
      },
    }}
  >
    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
      Usuario o contraseña incorrecto
    </Alert>
  </Snackbar>
);
