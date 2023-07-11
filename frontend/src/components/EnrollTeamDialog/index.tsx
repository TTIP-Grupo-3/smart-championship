import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { ChangeEventHandler, FC, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { useStyles } from './style';
import { BootstrapDialogTitle } from '../DialogTitle';
import { OutlinedInput } from '../OutlinedInput';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import defaultFootball from '../../default_match_icon_local.svg';

export const EnrollmentTeamDialog: FC<any> = ({ open, onClose, createTeam }) => {
  const { classes } = useStyles();
  const [image, setImage] = useState<string>('');
  const [file, setFile] = useState<File>();
  const [teamName, setTeamName] = useState<string>('');

  const handleName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTeamName(e.target.value);
  };

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    try {
      const url = URL.createObjectURL(file);
      setFile(file);
      setImage(url);
    } catch (e) {}
  };

  const createTeamUser = () => {
    createTeam(teamName, file);
  };

  return (
    <React.Fragment>
      <Dialog open={open} PaperProps={{ elevation: 24, style: { width: '30vw', height: 'auto' } }}>
        <BootstrapDialogTitle className={classes.titleDialog} onClose={onClose}>
          Crea Tu Equipo
        </BootstrapDialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Grid container className={classes.gridContentColumn}>
            <Grid container className={classes.gridContentRow}>
              <Typography variant="body1" className={classes.steps}>
                Carga el escudo y nombre del equipo.
              </Typography>
            </Grid>
            <Grid container className={classes.gridImage}>
              <img src={!file ? defaultFootball : image} className={classes.imageTeam} alt="avatar image" />
              <Button component="label" variant="contained" className={classes.buttonUpload}>
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
                value={teamName}
                onChange={handleName}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={createTeamUser} className={classes.createTeamButton}>
            <Typography className={classes.buttonText}>Crear</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
