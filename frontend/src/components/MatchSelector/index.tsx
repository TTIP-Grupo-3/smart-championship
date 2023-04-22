import { Grid, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { FC } from 'react';

export const MatchSelector: FC<any> = ({ matches, setSelected }) => {
  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelected(index);
  };

  return (
    <List component="nav" style={{ backgroundColor: 'grey' }}>
      {matches.map((match: any) => (
        <Grid
          key={match.id}
          direction="row"
          style={{ display: 'flex', width: '100%' }}
          alignItems="center"
          justifyContent="center"
        >
          <ListItemButton
            style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}
            onClick={(event) => handleListItemClick(event, match.id)}
          >
            <Typography color="white" style={{ textAlign: 'center' }}>
              {match.local.name} vs {match.visiting.name}
            </Typography>
          </ListItemButton>
        </Grid>
      ))}
    </List>
  );
};
