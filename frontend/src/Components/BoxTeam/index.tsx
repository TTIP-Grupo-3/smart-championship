import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './style';

interface BoxTeamProps {
  name: string;
}

export const BoxTeam: FC<BoxTeamProps> = ({ name }) => {
  const { classes } = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      {/*<Grid className={classes.gridLeft}></Grid>*/}

      <Grid className={classes.gridTeam}>
        <Typography color="black">{name}</Typography>
      </Grid>
    </Grid>
  );
};
