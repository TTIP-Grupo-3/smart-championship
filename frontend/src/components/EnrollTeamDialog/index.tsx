import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { Avatar, Grid, Typography } from '@mui/material';
import { useStyles } from './style';
import { BootstrapDialogTitle } from '../DialogTitle';
import { lightBlue } from '@mui/material/colors';
import { OutlinedInput } from '../OutlinedInput';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import defaultFootball from '../../default_match_icon_local.svg';
import Scroll from '../Scroll';

export const EnrollmentTeamDialog: FC<any> = ({ open, setOpen }) => {
  const { classes } = useStyles();
  const [image, setImage] = useState<string>('');
  const [file, setFile] = useState<File>();
  const [players, setPlayers] = useState<any[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [player, setPlayer] = useState<any>({ firstName: '', lastName: '', dni: '', number: '' });

  const handleClose = () => {
    setOpen(false);
  };

  const handleFile = (e: any) => {
    const files = e.target.files[0];
    setFile(files);
    setImage(URL.createObjectURL(files));
  };

  const handleAddPlayer = () => {
    setPlayers((prev) => [...prev, player]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayer({ ...player, [e.target.name]: e.target.value });
  };
  const scrollToElement = () => buttonRef?.current?.scrollIntoView();
  console.log(player);

  useEffect(() => {
    scrollToElement();
  }, [players]);

  const fieldsCompleted = () => {
    return Object.keys(player).every((key: string) => player[key].trim().length !== 0);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        style={{ borderRadius: 4, width: '100%' }}
        PaperProps={{ elevation: 24, style: { width: '90vw', height: '90vh' } }}
      >
        <BootstrapDialogTitle style={{ color: 'white' }} onClose={handleClose}>
          Crea Tu Equipo
        </BootstrapDialogTitle>
        <DialogContent>
          <Scroll className={classes.scroll}>
            <Grid container style={{ flexDirection: 'column', display: 'flex' }}>
              <Grid
                container
                style={{ flexDirection: 'row', display: 'flex', paddingTop: '2%', alignItems: 'center' }}
              >
                {' '}
                <Avatar
                  style={{
                    width: 26,
                    height: 25,
                    marginRight: '2%',
                    backgroundColor: lightBlue[800],
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  1
                </Avatar>
                <Typography variant="body1" className={classes.steps}>
                  Carga el escudo y nombre del equipo.
                </Typography>
              </Grid>
              <Grid
                container
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 24,
                }}
              >
                <img
                  src={!file ? defaultFootball : image}
                  style={{ borderRadius: '100%', width: '60px', height: '60px', marginRight: 10 }}
                  alt="avatar image"
                />
                <Button
                  component="label"
                  variant="contained"
                  style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}
                >
                  <AddPhotoAlternateIcon style={{ paddingRight: 6 }} /> Subir escudo
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    hidden
                    type="file"
                    onChange={handleFile}
                  />
                </Button>
              </Grid>
              <Grid className={classes.inputContainer}>
                <OutlinedInput
                  variant="outlined"
                  name="team"
                  label="Nombre del equipo"
                  placeholder="Championship FC"
                />
              </Grid>

              <Grid
                container
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  paddingTop: '2%',
                  paddingBottom: '2%',
                  alignItems: 'center',
                }}
              >
                {' '}
                <Avatar
                  style={{
                    width: 26,
                    height: 25,
                    marginRight: '2%',
                    backgroundColor: lightBlue[800],
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  2
                </Avatar>
                <Typography variant="body1" className={classes.steps}>
                  Carga la información de tus jugadores.
                </Typography>
              </Grid>
              <Grid container padding={2} direction="column">
                {players.map((player, index) => (
                  <Grid
                    container
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      padding: 2,
                      backgroundColor: 'gray',
                      borderRadius: 4,
                      margin: 5,
                    }}
                  >
                    <Typography color="white" padding={1}>
                      {player.number}
                    </Typography>
                    <Typography color="white" padding={1}>
                      {player.firstName}
                    </Typography>
                    <Typography color="white" padding={1}>
                      {player.lastName}
                    </Typography>
                    <Typography color="white" padding={1}>
                      {player.dni}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Grid container style={{ display: 'flex', flexDirection: 'row', padding: 10 }}>
                <Grid container style={{ display: 'flex', flexDirection: 'row', padding: 5, width: 75 }}>
                  <OutlinedInput label="N°" name="number" placeholder="10" onChange={handleChange} />
                </Grid>
                <Grid container style={{ display: 'flex', flexDirection: 'row', padding: 5, width: 140 }}>
                  <OutlinedInput
                    label="Nombre"
                    name="firstName"
                    placeholder="Nombre"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid container style={{ display: 'flex', flexDirection: 'row', padding: 5, width: 140 }}>
                  <OutlinedInput
                    label="Apellido"
                    name="lastName"
                    placeholder="Apellido"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid container style={{ display: 'flex', flexDirection: 'row', padding: 5, width: 140 }}>
                  <OutlinedInput label="DNI" name="dni" placeholder="14607531" onChange={handleChange} />
                </Grid>

                <Grid
                  container
                  style={{ display: 'flex', flexDirection: 'row', padding: 5, alignItems: 'center' }}
                >
                  <Button
                    ref={buttonRef}
                    variant="contained"
                    className={classes.buttonAdd}
                    disabled={!fieldsCompleted()}
                    onClick={handleAddPlayer}
                  >
                    Agregar Jugador
                  </Button>
                  <Typography variant="body1" color="white" paddingLeft={2}>
                    {players.length} Jugadores
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Scroll>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} style={{ backgroundColor: '#00BCD4', borderRadius: 4 }}>
            <Typography className={classes.buttonText}>Crear</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
