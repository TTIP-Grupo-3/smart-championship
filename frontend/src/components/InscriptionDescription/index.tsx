import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './style';

export const InscriptionDescription: FC<any> = ({ username, tournamentRequested, type }) => {
  const { classes } = useStyles();

  return (
    <Grid className={classes.grid}>
      <Typography variant="subtitle1" className={classes.title}>
        {username}
      </Typography>
      <Typography variant="body2">
        Inscripcion:{tournamentRequested} , Tipo: {type}
      </Typography>
    </Grid>
  );
};
