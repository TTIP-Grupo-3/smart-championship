import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { ChangeEvent, FC, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { useStyles } from './style';
import { BootstrapDialogTitle } from '../DialogTitle';
import { OutlinedInput } from '../OutlinedInput';

export const AddPlayerDialog: FC<any> = ({ open, setOpen }) => {
  const { classes } = useStyles();
  const [player, setPlayer] = useState<any>({ firstName: '', lastName: '', dni: '', number: '' });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayer({ ...player, [e.target.name]: e.target.value });
  };

  const fieldsCompleted = () => {
    return Object.keys(player).every((key: string) => player[key].trim().length !== 0);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        style={{ borderRadius: 4, width: '100%' }}
        PaperProps={{ elevation: 24, style: { maxWidth: '100%', width: 460, height: 'auto' } }}
      >
        <BootstrapDialogTitle style={{ color: 'white', paddingLeft: 23 }} onClose={handleClose}>
          Agregar Jugador
        </BootstrapDialogTitle>
        <DialogContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Grid container style={{ flexDirection: 'column', display: 'flex' }}>
            <Grid
              container
              style={{ flexDirection: 'row', display: 'flex', paddingTop: '2%', alignItems: 'center' }}
            >
              <Typography variant="body1" className={classes.steps}>
                Carga la información de tus jugadores.
              </Typography>
            </Grid>
            <Grid container className={classes.gridButton}>
              <OutlinedInput
                className={classes.input}
                label="Numero de camiseta"
                name="number"
                type="number"
                placeholder="10"
                onChange={handleChange}
              />
            </Grid>
            <Grid container className={classes.gridButton}>
              <OutlinedInput label="Nombre" name="firstName" placeholder="Nombre" onChange={handleChange} />
            </Grid>
            <Grid container className={classes.gridButton}>
              <OutlinedInput
                label="Apellido"
                name="lastName"
                placeholder="Apellido"
                onChange={handleChange}
              />
            </Grid>
            <Grid container className={classes.gridButton}>
              <OutlinedInput
                className={classes.input}
                label="DNI"
                name="dni"
                placeholder="14607531"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button className={classes.buttonAdd} onClick={handleClose} disabled={!fieldsCompleted()}>
            <Typography className={classes.buttonText}>Agregar Jugador</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
