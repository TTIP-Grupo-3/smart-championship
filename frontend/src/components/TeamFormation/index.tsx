import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Grid, IconButton, ListItemIcon, Typography, useTheme } from '@mui/material';
import { CheckBoxOutlineBlankOutlined } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC, Fragment, useState } from 'react';
import { DeleteTeamDialog } from '../DeleteTeamDialog';
import { useStyles } from './style';
import Scroll from '../Scroll';
import { Player } from '../../interfaces';
import { EmptyData } from '../EmptyData';
import { API_TEAM_LEADER } from '../../services/TeamLeader';
import SnackBar from '../Snackbar';
import { msgTypes } from '../../pages/Admin';
import { delay } from '../../utils/utils';

interface PlayerProps {
  players: Player[];
  reloadPlayers: () => any;
}

export const TeamFormation: FC<PlayerProps> = ({ players, reloadPlayers }) => {
  const [checked, setChecked] = useState<number[]>([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openS, setOpenS] = useState<any>({ open: false, type: 'success' });
  const theme = useTheme();

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
    API_TEAM_LEADER.deletePlayers(checked)
      .then(async () => {
        setChecked([]);
        await reloadPlayers();
        onSuccess();
      })
      .catch(onError);
  };

  const onClose = () => {
    setOpenDelete(false);
  };

  const onSuccess = async () => {
    setOpenS({ open: true, type: 'success' });
    onClose();
    await delay(2000);
    setOpenS({ open: false, type: 'success' });
  };

  const onError = async () => {
    setOpenS({ open: true, type: 'error' });
    onClose();
    await delay(2000);
    setOpenS({ open: false, type: 'error' });
  };

  return (
    <Fragment>
      <List dense className={classes.list}>
        <Grid container className={classes.gridContainer}>
          <ListItemIcon>
            <IconButton onClick={() => setOpenDelete(true)} disabled={!checked.length}>
              <DeleteIcon
                style={{ fill: checked.length > 0 ? theme.palette.common.white : 'grey' }}
              ></DeleteIcon>
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
            players.map((player) => {
              const labelId = `checkbox-list-secondary-label-${player.id}`;
              return (
                <ListItem key={player.id} disablePadding>
                  <ListItemIcon>
                    <Checkbox
                      className={classes.checkbox}
                      edge="start"
                      onChange={handleToggle(player.id)}
                      checked={checked.includes(player.id)}
                      inputProps={{ 'aria-labelledby': labelId }}
                      icon={<CheckBoxOutlineBlankOutlined style={{ color: theme.palette.common.white }} />}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <Grid container className={classes.gridTeam}>
                      <ListItemText style={{ width: '0px', paddingLeft: 20 }}>
                        <Typography color="white">{player.number}</Typography>
                      </ListItemText>
                      <ListItemText>
                        <Typography color="white" textAlign={'left'} paddingLeft={2}>
                          {player.name}
                        </Typography>
                      </ListItemText>
                    </Grid>
                  </ListItemText>
                </ListItem>
              );
            })
          )}
        </Scroll>

        <DeleteTeamDialog open={openDelete} onClose={onClose} onConfirmDelete={deletePlayers} />
      </List>
      <SnackBar
        open={openS.open}
        vertical={'bottom'}
        horizontal={'center'}
        msgSnack={msgTypes[openS.type]}
        type={openS.type}
        handleClose={() => setOpenS((prev: any) => ({ ...prev, open: false }))}
      />
    </Fragment>
  );
};
