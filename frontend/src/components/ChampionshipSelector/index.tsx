import { Grid, ListItem, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { FC } from 'react';
import { useStyles } from './style';

export const ChampionshipSelector: FC<any> = ({ championships, setChampionship }) => {
  const { classes } = useStyles();

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    championship: number,
  ) => {
    setChampionship(championship);
  };

  return (
    <>
      <Grid>
        <Typography className={classes.titleText} variant="h5">
          Selecciona un Torneo :
        </Typography>
      </Grid>
      <List className={classes.list}>
        {championships.map((championship: any) => (
          <ListItem key={championship.id} className={classes.listItem} disablePadding>
            <ListItemButton
              className={classes.listItemButton}
              onClick={(event) => handleListItemClick(event, championship)}
            >
              <Typography color="white" style={{ textAlign: 'center' }}>
                {championship.name}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};
