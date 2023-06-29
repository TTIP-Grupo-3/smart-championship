import { Button, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { EnrollmentTeamDialog } from '../EnrollTeamDialog';
import { useStyles } from './style';

export const EmptyTeam: FC<any> = ({ handleCreate, open, setOpen }) => {
  const { classes } = useStyles();
  return (
    <Grid container className={classes.emptyTeamGrid}>
      <Typography color="white" padding={2}>
        Notamos que no tienes ningun equipo.
      </Typography>
      <Button className={classes.createTeam} onClick={handleCreate}>
        <Typography className={classes.buttonText}>Crea Tu Primer Equipo</Typography>
      </Button>
      <EnrollmentTeamDialog open={open} setOpen={setOpen} />
    </Grid>
  );
};
