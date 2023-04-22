import { Grid, List, ListItem, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './style';

export const MatchUserResult: FC<any> = ({ cards }) => {
  const { classes } = useStyles();
  return (
    <List className={classes.teamStats}>
      {cards?.map((card: any) => (
        <>
          <ListItem key={card.id}>
            <Grid style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography style={{ paddingLeft: 60 }} color="white">
                {card.minute}'
              </Typography>
              <Typography style={{ paddingLeft: 10 }} color="white">
                {card.player.name}
              </Typography>
            </Grid>
          </ListItem>
        </>
      ))}
    </List>
  );
};
