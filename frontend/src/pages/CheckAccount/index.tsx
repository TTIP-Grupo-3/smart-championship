/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/NavBar';
import { useStyles } from './style';

export const CheckAccount = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/register');

  return (
    <Navbar>
      <Grid className={classes.grid}>
        <Typography className={classes.title}>Inscripcion a torneo</Typography>

        <Grid container className={classes.gridText}>
          <Typography color="white">
            Para inscribirte en un torneo debes poseer una cuenta en la aplicación
          </Typography>
        </Grid>
        <Grid container className={classes.card}>
          <Typography color="white">Si ya la tienes inicia sesión</Typography>

          <Button className={classes.buttons} onClick={handleLogin}>
            Iniciar Sesion
          </Button>
          <Typography color="white">O bien puedes registrarte </Typography>

          <Button className={classes.buttons} onClick={handleRegister}>
            Registrarse
          </Button>
        </Grid>
      </Grid>
    </Navbar>
  );
};
