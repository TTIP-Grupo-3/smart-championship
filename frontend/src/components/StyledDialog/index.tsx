import { styled } from '@mui/material/styles';
import { Dialog } from '@mui/material';

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },

  '& .MuiPaper-root': {
    width: 460,
    display: 'flex',
  },
}));
