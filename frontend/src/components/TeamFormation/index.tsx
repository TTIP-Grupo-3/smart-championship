import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Grid, IconButton, ListItemIcon, Typography } from '@mui/material';
import { CheckBoxOutlineBlankOutlined } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC, useState } from 'react';
import { DeleteTeamDialog } from '../DeleteTeamDialog';
import { useStyles } from './style';
import Scroll from '../Scroll';
import { Player } from '../../interfaces';
import { EmptyData } from '../EmptyData';

interface PlayerProps {
  players: Player[];
}

export const TeamFormation: FC<PlayerProps> = ({ players }) => {
  const [checked, setChecked] = useState([1]);
  const [openDelete, setOpenDelete] = useState(false);
  const { classes } = useStyles();
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const deletePlayers = () => {
    setOpenDelete(true);
  };

  return (
    <List dense className={classes.list}>
      <Grid container className={classes.gridContainer}>
        <ListItemIcon>
          <IconButton onClick={deletePlayers}>
            <DeleteIcon style={{ fill: 'white' }}></DeleteIcon>
          </IconButton>
        </ListItemIcon>
        <ListItemText style={{ width: '0px', paddingLeft: 20 }}>
          <Typography color="white">N°</Typography>
        </ListItemText>
        <ListItemText style={{ display: 'flex', paddingLeft: 0 }}>
          <Typography color="white" style={{ textAlign: 'center' }}>
            Nombre
          </Typography>
        </ListItemText>
      </Grid>

      <Scroll style={{ height: '30vh' }}>
        {players.length === 0 ? (
          <EmptyData emptyText="no hay jugadores" />
        ) : (
          players.map((value: any, index: number) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <ListItem key={index} disablePadding>
                <ListItemIcon>
                  <Checkbox
                    style={{ paddingLeft: '20px' }}
                    edge="start"
                    color="primary"
                    onChange={handleToggle(index)}
                    checked={checked.indexOf(index) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                    icon={<CheckBoxOutlineBlankOutlined style={{ color: 'white' }} />}
                  />
                </ListItemIcon>
                <ListItemButton>
                  <Grid container className={classes.gridTeam}>
                    <ListItemText style={{ width: '0px' }}>
                      <Typography color="white">{value.number}</Typography>
                    </ListItemText>
                    <ListItemText>
                      <Typography color="white" textAlign={'left'} paddingLeft={2}>
                        {value.name}
                      </Typography>
                    </ListItemText>
                  </Grid>
                </ListItemButton>
              </ListItem>
            );
          })
        )}
      </Scroll>

      <DeleteTeamDialog open={openDelete} setOpen={setOpenDelete} />
    </List>
  );
};
