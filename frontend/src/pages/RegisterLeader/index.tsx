import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Card, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/NavBar';
import { User } from '../../interfaces';
import { useStyles } from './style';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { OutlinedInput } from '../../components/OutlinedInput';
import { API_TEAM_LEADER } from '../../services/TeamLeader';

export const RegisterLeader = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { classes } = useStyles();
  const [user, setUser] = useState<User>({ firstName: '', lastName: '', username: '', password: '' });
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  const handleRegister: FormEventHandler<HTMLFormElement> = (e: any) => {
    e.preventDefault();
    API_TEAM_LEADER.register(user).then(({ data }) => {
      localStorage.setItem('token', data.access_token);
      navigate('/leader');
    });
  };

  const canRegister = () => {
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
              label="Nombre"
              name="firstName"
              onChange={handleChange}
              placeholder="Nombre"
            />
            <Grid style={{ padding: 15 }} />

            <OutlinedInput
              variant="outlined"
              label="Apellido"
              name="lastName"
              onChange={handleChange}
              placeholder="Apellido"
            />
            <Grid style={{ padding: 15 }} />

            <OutlinedInput
              variant="outlined"
              label="Usuario"
              name="username"
              onChange={handleChange}
              placeholder="Usuario"
            />
            <Grid style={{ padding: 15 }} />
            <OutlinedInput
              label="Contraseña"
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
                        <Visibility style={{ color: 'white' }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder="Contraseña"
              type={showPassword ? 'text' : 'password'}
            />

            <Grid className={classes.gridContainerButton} marginTop={6}>
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
    </Navbar>
  );
};
