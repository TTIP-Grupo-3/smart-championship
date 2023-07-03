import { Button, Grid, Typography } from '@mui/material';
import { FC, Fragment } from 'react';
import { EnrollmentTeamDialog } from '../EnrollTeamDialog';
import { useStyles } from './style';

export const msgTypes: any = {
  success: 'Equipo agregado correctamente',
  error: 'Ha ocurrido un error intenta mas tarde',
};

export const EmptyTeam: FC<any> = ({ handleCreate, open, setOpen, createTeam }) => {
  const { classes } = useStyles();

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Grid container className={classes.emptyTeamGrid}>
        <Typography color="white" padding={2}>
          Notamos que no tienes ningun equipo.
        </Typography>
        <Button className={classes.createTeam} onClick={handleCreate}>
          <Typography className={classes.buttonText}>Crea Tu Primer Equipo</Typography>
        </Button>
        <EnrollmentTeamDialog {...{ createTeam, onClose, open }} />
      </Grid>
    </Fragment>
  );
};
