import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  inputLabelClasses,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useStyles } from './style';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { classes } = useStyles();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      flexGrow={1}
      minHeight="100vh"
    >
      <Card style={{ backgroundColor: '#001E3C', padding: 48, borderRadius: 6 }} elevation={24}>
        <Typography color="white" variant="h5">
          SMART.CHAMPIONSHIP
        </Typography>
        <Grid style={{ padding: 20 }} />

        <FormControl>
          <TextField
            variant="outlined"
            label="Usuario"
            InputProps={{ classes: { notchedOutline: classes.notchedOutline } }}
            InputLabelProps={{
              sx: {
                color: 'white',
                [`&.${inputLabelClasses.shrink}`]: {
                  color: 'white',
                },
              },
            }}
            placeholder="Usuario"
            style={{ color: 'white' }}
          />
          <Grid style={{ padding: 30 }} />
          <TextField
            label="Contraseña"
            variant="outlined"
            InputLabelProps={{
              sx: {
                color: 'white',
                [`&.${inputLabelClasses.shrink}`]: {
                  color: 'white',
                },
              },
            }}
            InputProps={{
              classes: { notchedOutline: classes.notchedOutline },
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
            style={{ color: 'white' }}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
          />
          <Grid direction="column" justifyContent="center" alignItems="center" display="flex" marginTop={6}>
            <Button variant="contained" style={{ width: '50%', backgroundColor: '#00BCD4' }}>
              Log in
            </Button>
          </Grid>
        </FormControl>
      </Card>
    </Grid>
  );
};
