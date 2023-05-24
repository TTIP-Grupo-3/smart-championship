import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  inputLabelClasses,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/NavBar';
import { ErrorLogin } from '../../components/Snackbar';
import { User } from '../../interfaces';
import { API_AUTH } from '../../services/Auth';
import { useStyles } from './style';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { classes } = useStyles();
  const [user, setUser] = useState<User>({ username: '', password: '' });
  const navigate = useNavigate();
  const [isInvalidUser, setIsInvalidUser] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  const handleLogin: FormEventHandler<HTMLFormElement> = (e: any) => {
    e.preventDefault();
    API_AUTH.login(user)
      .then(({ data }) => {
        localStorage.setItem('token', data.access_token);
        navigate('/inspector');
      })
      .catch(() => setIsInvalidUser(true));
  };

  return (
    <Navbar
      removebuttonLog
      button={{
        action: () => navigate(-1),
        text: 'Torneos',
        icon: <EmojiEventsIcon style={{ height: 22, display: 'flex', color: 'yellow' }} />,
      }}
    >
      {' '}
      <Grid className={classes.root} container>
        <Card style={{ backgroundColor: '#001E3C', padding: 48, borderRadius: 6 }} elevation={24}>
          <Typography color="white" variant="h5">
            SMART.CHAMPIONSHIP
          </Typography>
          <Grid style={{ padding: 20 }} />

          <form onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              label="Usuario"
              InputProps={{ classes: { notchedOutline: classes.notchedOutline, input: classes.input } }}
              InputLabelProps={{
                sx: {
                  color: 'white',
                  [`&.${inputLabelClasses.shrink}`]: {
                    color: 'white',
                  },
                },
              }}
              name="username"
              onChange={handleChange}
              placeholder="Usuario"
              style={{ color: 'white', width: '100%' }}
            />
            <Grid style={{ padding: 30 }} />
            <TextField
              label="Contraseña"
              variant="outlined"
              name="password"
              onChange={handleChange}
              InputLabelProps={{
                sx: {
                  color: 'white',
                  [`&.${inputLabelClasses.shrink}`]: {
                    color: 'white',
                  },
                },
              }}
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
              style={{ color: 'white', width: '100%' }}
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
            />
            <ErrorLogin open={isInvalidUser} />
            <Grid
              direction="column"
              justifyContent="center"
              alignItems="center"
              display="flex"
              marginTop={isInvalidUser ? 2 : 6}
            >
              <Button
                type="submit"
                variant="contained"
                style={{ width: '50%', backgroundColor: '#00BCD4' }}
              >
                Log in
              </Button>
            </Grid>
          </form>
        </Card>
      </Grid>
    </Navbar>
  );
};
