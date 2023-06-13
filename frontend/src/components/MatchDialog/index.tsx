import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Close } from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';
import { useStyles } from './style';
import { DialogTitle, IconButton, Typography } from '@mui/material';
import { MatchScoreResult } from '../MatchScoreResult';
import { MatchUserStats } from '../MatchUserStats';
import { MatchService } from '../../services/MatchService';
import dayjs from 'dayjs';
import { StatusMatch } from '../StatusMatch';
import Scroll from '../Scroll';
import { Loader } from '../Loader';

const matchService = new MatchService();
const socket = matchService.create();

export const MatchDialog: FC<any> = ({ open, close, matchId, championshipData }) => {
  const { classes } = useStyles();
  const [match, setMatch] = useState<any>();
  const [time, setTime] = useState(0);
  const matchService = new MatchService();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (open) {
      socket.on('match', (data: any) => {
        setMatch(data);
        setIsLoading(false);
      });
      matchService.subscribe(socket, {
        id: matchId,
        championshipId: +championshipData.id,
        championshipType: championshipData.type,
      });
    }
    return () => (open ? matchService.unsubscribe(socket) : undefined);
  }, [open]);

  const currentTime = () => {
    const startTime = dayjs(match?.start);
    if (match?.status === 'TOSTART') return 0;
    if (match?.status === 'FINISHED') {
      return startTime.diff(match.end, 'minute');
    }
    return dayjs(new Date().toISOString()).diff(startTime, 'minute');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Math.abs(currentTime()));
    }, 100);
    return () => clearInterval(interval);
  }, [currentTime]);

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      open={open}
      PaperProps={{ elevation: 24 }}
      aria-labelledby="responsive-dialog-title"
    >
      {isLoading ? (
        <Loader text="" />
      ) : (
        <>
          <DialogTitle className={classes.dialogTitle} style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography className={classes.typographyTitle}>Informacion del partido</Typography>
            <StatusMatch status={match?.status} className={classes.status} />

            <IconButton aria-label="close" onClick={close} className={classes.closeIcon}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent className={classes.backgroundDialog}>
            <Scroll className={classes.scroll}>
              <MatchScoreResult {...{ match, time }} />
              <MatchUserStats
                title="Goles"
                dataLocal={match?.local.goals}
                dataVisiting={match?.visiting.goals}
              />

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
            </Scroll>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};
