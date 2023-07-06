import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Card, Grid, IconButton, InputAdornment, Typography, useTheme } from '@mui/material';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/NavBar';
import { TeamLeaderData } from '../../interfaces';
import { useStyles } from './style';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { OutlinedInput } from '../../components/OutlinedInput';
import { API_TEAM_LEADER } from '../../services/TeamLeader';
import { useSnackbar } from '../../hooks/useSnackbar';

const validationMessages: { [key: string]: string } = {
  ['password is not strong enough']: 'La contraseña no es lo suficientemente segura',
  ['Already exists']: 'El nombre de usuario ya está en uso',
};

export const RegisterLeader = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { classes } = useStyles();
  const [user, setUser] = useState<TeamLeaderData>({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const theme = useTheme();
  const { Snack, onError } = useSnackbar();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  const handleRegister: FormEventHandler<HTMLFormElement> = (e: any) => {
    e.preventDefault();
    API_TEAM_LEADER.register(user)
      .then(({ data }) => {
        localStorage.setItem('token', data.access_token);
        navigate('/leader');
      })
      .catch((err) => {
        if (err.response.data.message instanceof Array) {
          onError(validationMessages[err.response.data.message[0]]);
        } else {
          onError(validationMessages[err.response.data.message]);
        }
      });
  };

  const canRegister = (): boolean => {
    return Object.keys(user).every((key: string) => user[key].trim().length !== 0);
  };

  return (
    <Navbar
      removebuttonLog
      button={{
        action: () => navigate('/'),
        text: 'Torneos',
        icon: <EmojiEventsIcon style={{ height: 22, display: 'flex', color: 'yellow' }} />,
      }}
    >
      {' '}
      <Grid className={classes.root} container>
        <Card
          style={{ backgroundColor: '#001E3C', padding: 20, paddingInline: 60, borderRadius: 4 }}
          elevation={24}
        >
          <Typography color="white" variant="h5">
            Registro SMART.CHAMPIONSHIP
          </Typography>
          <Grid style={{ padding: 20 }} />

          <form onSubmit={handleRegister}>
            <OutlinedInput
              variant="outlined"
              required
              label="Nombre"
              name="firstName"
              onChange={handleChange}
              placeholder="Nombre"
            />
            <Grid style={{ padding: 15 }} />

            <OutlinedInput
              variant="outlined"
              label="Apellido"
              required
              name="lastName"
              onChange={handleChange}
              placeholder="Apellido"
            />
            <Grid style={{ padding: 15 }} />

            <OutlinedInput
              variant="outlined"
              label="Usuario"
              required
              name="username"
              onChange={handleChange}
              placeholder="Usuario"
            />
            <Grid style={{ padding: 12 }} />
            <Typography fontSize={12} color="white" paddingBottom={1}>
              al menos 8 caracteres con mayuscula, minuscula y 1 caracter especial.
            </Typography>
            <OutlinedInput
              label="Contraseña"
              required
              variant="outlined"
              name="password"
              onChange={handleChange}
              InputProps={{
                classes: { notchedOutline: classes.notchedOutline, input: classes.input },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff style={{ color: 'grey' }} />
                      ) : (
                        <Visibility style={{ color: theme.palette.common.white }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder="Contraseña"
              type={showPassword ? 'text' : 'password'}
            />
            <Grid container flexDirection="row" alignItems="center" justifyContent={'center'}>
              <Typography fontSize={12} color="white" paddingTop={1} paddingRight={0.5}>
                si ya tienes cuenta
              </Typography>
              <Link to={'/login'} style={{ color: 'aquamarine', fontSize: 12, paddingTop: 5 }}>
                inicia sesion
              </Link>
            </Grid>
            <Grid className={classes.gridContainerButton} marginTop={3}>
              <Button
                type="submit"
                variant="contained"
                className={classes.buttonLogin}
                disabled={!canRegister()}
              >
                <Typography className={classes.textLogin}>Registrarse</Typography>
              </Button>
            </Grid>
          </form>
        </Card>
      </Grid>
      <Snack />
    </Navbar>
  );
};
