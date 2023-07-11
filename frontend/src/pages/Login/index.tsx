import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Card, Grid, IconButton, InputAdornment, Typography, useTheme } from '@mui/material';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/NavBar';
import { ErrorLogin } from '../../components/ErrorLogin';
import { User } from '../../interfaces';
import { API_AUTH } from '../../services/Auth';
import { useStyles } from './style';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { OutlinedInput } from '../../components/OutlinedInput';

type RoleType = { [key: string]: string };

export const roles: RoleType = {
  admin: '/admin/tournaments',
  reviewer: '/reviewer',
  team_leader: '/leader',
};

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { classes } = useStyles();
  const [user, setUser] = useState<User>({ username: '', password: '' });
  const navigate = useNavigate();
  const [isInvalidUser, setIsInvalidUser] = useState(false);
  const theme = useTheme();

  const handleClickShowPassword = (): void => setShowPassword(!showPassword);

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  const handleLogin: FormEventHandler<HTMLFormElement> = (e: any) => {
    e.preventDefault();
    API_AUTH.login(user)
      .then(async ({ data }) => {
        localStorage.setItem('token', data.access_token);
        const { data: profile } = await API_AUTH.profile();
        redirectAccordingToRole(profile.role);
      })
      .catch(() => setIsInvalidUser(true));
  };

  const redirectAccordingToRole = (role: string): void => {
    navigate(roles[role]);
  };

  const canLogin = (): boolean => {
    return user.username.trim().length !== 0 && user.password.trim().length !== 0;
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
        <Card style={{ backgroundColor: '#001E3C', padding: 48, borderRadius: 6 }} elevation={24}>
          <Typography color="white" variant="h5">
            SMART.CHAMPIONSHIP
          </Typography>
          <Grid style={{ padding: 20 }} />

          <form onSubmit={handleLogin}>
            <OutlinedInput
              variant="outlined"
              label="Usuario"
              name="username"
              onChange={handleChange}
              placeholder="Usuario"
            />
            <Grid style={{ padding: 22 }} />

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
                Si no posees cuenta
              </Typography>
              <Link to={'/register'} style={{ color: 'aquamarine', fontSize: 12, paddingTop: 5 }}>
                registrate
              </Link>
            </Grid>
            <ErrorLogin open={isInvalidUser} />
            <Grid className={classes.gridContainerButton} marginTop={isInvalidUser ? 2 : 6}>
              <Button
                type="submit"
                variant="contained"
                className={classes.buttonLogin}
                disabled={!canLogin()}
              >
                <Typography className={classes.textLogin}>Log in</Typography>
              </Button>
            </Grid>
          </form>
        </Card>
      </Grid>
    </Navbar>
  );
};
