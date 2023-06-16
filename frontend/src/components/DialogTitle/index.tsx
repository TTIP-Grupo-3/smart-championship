import { DialogTitle, DialogTitleProps, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface TitleDialogProps extends DialogTitleProps {
  onClose: () => void;
}

export const BootstrapDialogTitle = (props: TitleDialogProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
