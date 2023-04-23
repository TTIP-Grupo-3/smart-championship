import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Close } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { FC, useEffect, useState } from 'react';
import { useStyles } from './style';
import { DialogTitle, IconButton, Typography } from '@mui/material';
import { SocketService } from '../../services/SocketService';
import { MatchScoreResult } from '../MatchScoreResult';
import { MatchUserStats } from '../MatchUserStats';

const socketService = new SocketService();
const socket = socketService.create('match');

export const MatchDialog: FC<any> = ({ open, close, matchId }) => {
  const { classes } = useStyles();
  const [match, setMatch] = useState<any>();

  useEffect(() => {
    if (open) {
      socket.on('match', (data: any) => setMatch(data));
      socketService.subscribe(socket, { id: matchId, championshipId: 1 });
    }
    return () => (open ? socketService.unsubscribe(socket) : undefined);
  }, [open]);

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
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
            backgroundColor: match?.status === 'FINISHED' ? 'red' : 'green',
          }}
        >
          {match?.status === 'FINISHED'
            ? 'Finalizado'
            : match?.status === 'TOSTART'
            ? 'A jugar'
            : 'En juego'}
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
