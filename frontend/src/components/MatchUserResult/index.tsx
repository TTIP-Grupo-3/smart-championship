import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './style';

export const MatchUserResult: FC<any> = ({ cards }) => {
  const { classes } = useStyles();
  return (
    <Grid className={classes.teamStats}>
      {cards?.map((card: any) => (
        <Grid key={card.id}>
          <Typography style={{ paddingLeft: 60 }} color="white">
            {card.minute}'{card.player.name}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};
