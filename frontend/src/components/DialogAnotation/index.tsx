import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { FC } from 'react';
import { Typography, useTheme } from '@mui/material';
import { useStyles } from './style';

export interface SimpleDialogProps {
  open: boolean;
  items: any[];
  onClose: (value?: number) => void;
}

export const DialogAnotation: FC<SimpleDialogProps> = ({ onClose, open, items = [] }) => {
  const { classes } = useStyles();
  const theme = useTheme();

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: number) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} classes={{ paper: classes.dialogPaper }}>
      <DialogTitle style={{ color: theme.palette.common.white }}>Seleccione jugador</DialogTitle>
      <List sx={{ pt: 0 }}>
        {items.map((it: any) => (
          <ListItem className={classes.itemList} disableGutters key={it.id}>
            <ListItemButton onClick={() => handleListItemClick(it.id)}>
              <Typography padding={2} color="white">
                {it.number}
              </Typography>
              <Typography padding={2} color="white">
                {it.name}
              </Typography>
              <Typography padding={2} color="white">
                {it.minute !== undefined ? `${it.minute}' ` : ''}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};
