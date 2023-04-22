import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Close } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { FC, useEffect, useState } from 'react';
import { useStyles } from './style';
import { DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import { SocketService } from '../../services/SocketService';
import { MatchScoreResult } from '../MatchScoreResult';
import { MatchUserResult } from '../MatchUserResult';
import { MatchUserStats } from '../MatchUserStats';

const socketService = new SocketService();

export const MatchDialog: FC<any> = ({ open, close, matchId }) => {
  const theme = useTheme();
  const { classes } = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down(300));
  const [match, setMatch] = useState<any>();
  console.log(match);

  useEffect(() => {
    const socket = socketService.create('match');
    socket.on('match', (data: any) => setMatch(data));
    socketService.subscribe(socket, { id: matchId, championshipId: 1 });
    return () => socketService.unsubscribe(socket);
  }, []);
  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      fullScreen={fullScreen}
      open={open}
      PaperProps={{ elevation: 24 }}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle className={classes.dialogTitle} style={{ display: 'flex', flexDirection: 'row' }}>
        <Typography className={classes.typographyTitle}>Informacion del partido</Typography>
        <Typography
          color="white"
          variant="body1"
          style={{
            marginLeft: 20,
            fontSize: 13,
            fontWeight: 700,
            borderRadius: 6,
            paddingTop: 3,
            paddingBottom: 3,
            paddingLeft: 6,
            paddingRight: 6,
            backgroundColor: 'red',
          }}
        >
          {match?.status}
        </Typography>

        <IconButton aria-label="close" onClick={close} className={classes.closeIcon}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.backgroundDialog}>
        <MatchScoreResult match={match} time="0" />
        <MatchUserStats title="Goles" dataLocal={match?.local.goals} dataVisiting={match?.visiting.goals} />

        <MatchUserStats
          title="Amarillas"
          dataLocal={match?.local.cards.yellow}
          dataVisiting={match?.visiting.cards.yellow}
        />

        <MatchUserStats
          title="Rojas"
          dataLocal={match?.local.cards.red}
          dataVisiting={match?.visiting.cards.red}
        />
      </DialogContent>
    </Dialog>
  );
};
