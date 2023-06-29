import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { ChangeEvent, FC, Fragment, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { useStyles } from './style';
import { BootstrapDialogTitle } from '../DialogTitle';
import { OutlinedInput } from '../OutlinedInput';
import { containsOnlyNumbers } from '../../utils/utils';

export const AddPlayerDialog: FC<any> = ({ open, setOpen }) => {
  const { classes } = useStyles();
  const [player, setPlayer] = useState<any>({ firstName: '', lastName: '', dni: 0, number: 0 });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayer({ ...player, [e.target.name]: e.target.value });
  };

  const fieldsCompleted = () => {
    return Object.keys(player).every((key: string) => player[key].trim().length !== 0);
  };

  const handleChangeNumber = (e: any) => {
    const { target } = e;
    (containsOnlyNumbers(target.value) || target.value === '') &&
      setPlayer({ ...player, [e.target.name]: +e.target.value });
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        style={{ borderRadius: 4, width: '100%' }}
        PaperProps={{ elevation: 24, style: { maxWidth: '100%', width: 460, height: 'auto' } }}
      >
        <BootstrapDialogTitle style={{ color: 'white', paddingLeft: 23 }} onClose={handleClose}>
          Agregar Jugador
        </BootstrapDialogTitle>
        <DialogContent className={classes.dialogContainer}>
          <Grid container className={classes.gridDialogContainer}>
            <Grid className={classes.gridContent} container>
              <Typography variant="body1" className={classes.steps}>
                Carga la información de tus jugadores.
              </Typography>
            </Grid>
            <Grid container className={classes.gridButton}>
              <OutlinedInput
                value={player.number}
                className={classes.input}
                label="Numero de camiseta"
                name="number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 3 }}
                placeholder={10}
                onChange={handleChangeNumber}
              />
            </Grid>
            <Grid container className={classes.gridButton}>
              <OutlinedInput
                value={player.firstName}
                label="Nombre"
                name="firstName"
                placeholder="Nombre"
                onChange={handleChange}
              />
            </Grid>
            <Grid container className={classes.gridButton}>
              <OutlinedInput
                label="Apellido"
                name="lastName"
                value={player.lastName}
                placeholder="Apellido"
                onChange={handleChange}
              />
            </Grid>
            <Grid container className={classes.gridButton}>
              <OutlinedInput
                className={classes.input}
                label="DNI"
                value={player.dni}
                name="dni"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 8 }}
                placeholder={14607531}
                onChange={handleChangeNumber}
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
    </Fragment>
  );
};