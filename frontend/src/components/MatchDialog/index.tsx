import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Close } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { FC, useEffect, useState } from 'react';
import { useStyles } from './style';
import { DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import { SocketService } from '../../services/SocketService';
import { BoxTeamProps } from '../BoxTeams';
import { MatchScoreResult } from '../MatchScoreResult';

const socketService = new SocketService();

export const MatchDialog: FC<any> = ({ open, close, matchId }) => {
  const theme = useTheme();
  const { classes } = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down(300));
  const [match, setMatch] = useState<BoxTeamProps>();

  useEffect(() => {
    const socket = socketService.create('match');
    socket.on('match', (data: any) => setMatch(data));
    socketService.subscribe(socket, { id: matchId, championshipId: 1 });
    return () => socketService.unsubscribe(socket);
  }, []);
  console.log(match);
  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      fullScreen={fullScreen}
      open={open}
      PaperProps={{ elevation: 24 }}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle className={classes.dialogTitle}>
        <Typography className={classes.typographyTitle}>Informacion del partido</Typography>
        <IconButton aria-label="close" onClick={close} className={classes.closeIcon}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.backgroundDialog}>
        <MatchScoreResult match={match} time="0" />
        <Grid container>
          <Grid className={classes.statsGrid}>
            <Typography variant="h5" color="white">
              Amarillas
            </Typography>
            <Grid container style={{ backgroundColor: 'palegoldenrod' }}>
              <Grid className={classes.teamStats}>
                {match?.local.cards.yellow.map((card: any) => (
                  <Grid key={card.id}>
                    <Typography>
                      {card.player.number}
                      {card.player.name} {card.minute}
                    </Typography>
                  </Grid>
                ))}{' '}
                {match?.local.cards.red.map((card: any) => (
                  <Grid key={card.id}>
                    <Typography>
                      {card.player.number}
                      {card.player.name} {card.minute}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Grid className={classes.teamStats}>
                {match?.visiting.cards.yellow.map((card: any) => (
                  <Grid key={card.id}>
                    <Typography>
                      {card.player.number}

                      {card.player.name}
                      {card.minute}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid container>
              <Grid className={classes.statsGrid}>
                <Typography variant="h5" color="white">
                  Rojas
                </Typography>
                <Grid container style={{ backgroundColor: 'palegoldenrod' }}>
                  <Grid className={classes.teamStats}>
                    {match?.local.cards.red.map((card: any) => (
                      <Grid key={card.id}>
                        <Typography>
                          {card.player.number}
                          {card.player.name} {card.minute}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                  <Grid className={classes.teamStats}>
                    {match?.visiting.cards.red.map((card: any) => (
                      <Grid key={card.id}>
                        <Typography>
                          {card.player.number}
                          {card.player.name} {card.minute}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
