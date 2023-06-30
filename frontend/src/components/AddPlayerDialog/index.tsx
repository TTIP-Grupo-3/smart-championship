import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { ChangeEvent, FC, Fragment, useState } from 'react';
import { Grid, Typography, useTheme } from '@mui/material';
import { useStyles } from './style';
import { BootstrapDialogTitle } from '../DialogTitle';
import { OutlinedInput } from '../OutlinedInput';
import { containsOnlyNumbers } from '../../utils/utils';

export const AddPlayerDialog: FC<any> = ({ open, createPlayer, onClose }) => {
  const { classes } = useStyles();
  const theme = useTheme();
  const [player, setPlayer] = useState<any>({ firstName: '', lastName: '', dni: 0, number: 0 });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayer({ ...player, [e.target.name]: e.target.value });
  };

  const fieldsTextCompleted = () => {
    return ['firstName', 'lastName'].every((key: string) => player[key].trim().length !== 0);
  };

  const dniCompleted = () => player.dni.toString().length > 7;

  const handleChangeNumber = (e: any) => {
    const { target } = e;
    (containsOnlyNumbers(target.value) || target.value === '') &&
      setPlayer({ ...player, [e.target.name]: +e.target.value });
  };

  const createNewPlayer = async () => {
    const { firstName, lastName, ...rest } = player;
    const newPlayer = { name: `${firstName}  ${lastName}`, ...rest };
    await createPlayer(newPlayer);
    setPlayer({ firstName: '', lastName: '', dni: 0, number: 0 });
    onClose();
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        style={{ borderRadius: 4, width: '100%' }}
        PaperProps={{ elevation: 24, style: { maxWidth: '100%', width: 460, height: 'auto' } }}
      >
        <BootstrapDialogTitle
          style={{ color: theme.palette.common.white, paddingLeft: 23 }}
          onClose={onClose}
        >
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
          <Button
            className={classes.buttonAdd}
            onClick={createNewPlayer}
            disabled={!fieldsTextCompleted() || !dniCompleted()}
          >
            <Typography className={classes.buttonText}>Agregar Jugador</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
