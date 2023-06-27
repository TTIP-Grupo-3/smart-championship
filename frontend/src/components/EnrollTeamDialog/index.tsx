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
    const file = e.target.files[0];
    try {
      const url = URL.createObjectURL(file);
      setFile(file);
      setImage(url);
    } catch (e) {}
  };

  const handleAddPlayer = () => {
    setPlayers((prev) => [...prev, 'player']);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayer({ ...player, [e.target.name]: e.target.value });
  };
  const scrollToElement = () => buttonRef?.current?.scrollIntoView();

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
        PaperProps={{ elevation: 24, style: { width: '30vw', height: 'auto' } }}
      >
        <BootstrapDialogTitle style={{ color: 'white', paddingLeft: 23 }} onClose={handleClose}>
          Crea Tu Equipo
        </BootstrapDialogTitle>
        <DialogContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Grid container style={{ flexDirection: 'column', display: 'flex' }}>
            <Grid
              container
              style={{ flexDirection: 'row', display: 'flex', paddingTop: '2%', alignItems: 'center' }}
            >
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
                padding: 18,
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
          </Grid>
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
