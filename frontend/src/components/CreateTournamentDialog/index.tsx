import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';
import { inputLabelClasses, SelectChangeEvent, TextField } from '@mui/material';
import { SelectorNumber } from '../SelectorNumber';
import { SelectTournamentType } from '../SelectTournamentType';
import { useStyles } from './style';
import Scroll from '../Scroll';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
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

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
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
}

export const CreateTournamentDialog: FC<any> = ({ open, onClose }) => {
  const { classes } = useStyles();
  const [tournamentType, setTournamentType] = useState<number>(1);

  const handleChange = (event: SelectChangeEvent<number>) => {
    const {
      target: { value },
    } = event;
    setTournamentType(+value);
  };

  return (
    <BootstrapDialog onClose={onClose} open={open} PaperProps={{ elevation: 24 }}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        <Typography color="white">Crear Torneo</Typography>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Scroll className={classes.scroll}>
          <TextField
            required
            variant="outlined"
            label="Nombre del torneo"
            InputProps={{ classes: { notchedOutline: classes.notchedOutline, input: classes.input } }}
            InputLabelProps={{
              sx: {
                color: 'white',
                [`&.${inputLabelClasses.shrink}`]: {
                  color: 'white',
                },
              },
            }}
            onChange={() => {
              console.log('');
            }}
            placeholder="Torneo Smart Championship"
            style={{ color: 'white', width: '100%' }}
          />

          <Typography color="white" paddingTop={2}>
            Modalidad de torneo:
          </Typography>
          <SelectTournamentType value={tournamentType} onChange={handleChange} />
          <Typography gutterBottom color="white" paddingTop={2}>
            Equipos :
          </Typography>
          {tournamentType === 2 ? (
            <TextField
              required
              className={classes.root}
              variant="outlined"
              label="Cantidad"
              InputProps={{ classes: { notchedOutline: classes.notchedOutline, input: classes.input } }}
              InputLabelProps={{
                sx: {
                  color: 'white',
                  [`&.${inputLabelClasses.shrink}`]: {
                    color: 'white',
                  },
                },
              }}
              onChange={() => {
                console.log('');
              }}
              type="number"
              placeholder="10 Equipos"
              style={{ color: 'white', width: '100%' }}
            />
          ) : (
            <SelectorNumber isTeamSelector options={[2, 4, 8, 16, 32]} defaultOption={16} />
          )}
          <Typography color="white" variant="body2" paddingTop={2}>
            Cantidad de jugadores
          </Typography>
          <SelectorNumber options={[5, 6, 7, 8, 9, 10, 11]} defaultOption={5} />
        </Scroll>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Confirmar
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};
