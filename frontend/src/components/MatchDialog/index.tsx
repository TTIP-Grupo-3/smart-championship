import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Close } from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';
import { useStyles } from './style';
import { DialogTitle, IconButton, Typography } from '@mui/material';
import { MatchScoreResult } from '../MatchScoreResult';
import { MatchUserStats } from '../MatchUserStats';
import { MatchService } from '../../services/MatchService';

const matchService = new MatchService();
const socket = matchService.create();

export const MatchDialog: FC<any> = ({ open, close, matchId }) => {
  const { classes } = useStyles();
  const [match, setMatch] = useState<any>();
  const matchService = new MatchService();

  useEffect(() => {
    if (open) {
      socket.on('match', (data: any) => setMatch(data));
      matchService.subscribe(socket, { id: matchId, championshipId: 1 });
    }
    return () => (open ? matchService.unsubscribe(socket) : undefined);
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
          variant="body1"
          className={classes.statusMatch}
          style={{ backgroundColor: match?.status === 'FINISHED' ? 'red' : 'green' }}
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
