import { Button, Grid, ListItem, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { FC } from 'react';
import { useStyles } from './style';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const MatchSelector: FC<any> = ({ matches, setSelected, back }) => {
  const { classes } = useStyles();

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelected(index);
  };

  return (
    <>
      <Grid container flexDirection="row" alignItems="center">
        <Button
          style={{ marginTop: '2%', color: 'white', marginRight: '16%', marginLeft: '6%' }}
          onClick={() => back(null)}
        >
          <ArrowBackIcon style={{ color: 'white' }} />
        </Button>

        <Typography className={classes.titleText} variant="h5">
          Selecciona un partido para administrar:
        </Typography>
      </Grid>
      <List className={classes.list}>
        {matches.map((match: any) => (
          <ListItem key={match.id} className={classes.listItem} disablePadding>
            <ListItemButton
              className={classes.listItemButton}
              onClick={(event) => handleListItemClick(event, match.id)}
            >
              <Typography color="white" style={{ textAlign: 'center' }}>
                {match.local.name} vs {match.visiting.name}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};
