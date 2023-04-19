import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Close } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { FC } from 'react';
import { useStyles } from './style';
import { DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import smartLogoLocal from '../../default_match_icon_local.svg';
import smartLogoVisiting from '../../default_match_icon_visiting.svg';
import { MatchTeam } from '../MatchTeam';
import { SimpleAccordion } from '../Accordion';

export const MatchDialog: FC<any> = ({ open, close }) => {
  const theme = useTheme();
  const { classes } = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down(300));
  const cards = { yellow: 0, red: 0 };
  const team = {
    name: 'Team-1',
    goals: 0,
    cards: cards,
  };
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
        <Grid container>
          <Grid className={classes.teamMatch}>
            <MatchTeam logo={smartLogoLocal} team={team} showCards={false} />
            <Typography variant="h3" className={classes.resultScore}>
              0
            </Typography>
          </Grid>
          <Grid className={classes.timer}>
            <Typography variant="body1" className={classes.time}>
              time
            </Typography>
            <Typography variant="body1" className={classes.time}>
              -
            </Typography>
          </Grid>
          <Grid className={classes.teamMatch}>
            <MatchTeam logo={smartLogoVisiting} team={team} showCards={false} />
            <Typography variant="h3" className={classes.resultScore}>
              1
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid className={classes.statsGrid}>
            <SimpleAccordion text="Goles" />
            <SimpleAccordion text="Amonestaciones" />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
