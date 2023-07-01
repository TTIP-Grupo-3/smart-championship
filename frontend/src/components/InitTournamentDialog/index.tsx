/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { useStyles } from './style';
import Scroll from '../Scroll';
import { BootstrapDialog } from '../StyledDialog';
import { BootstrapDialogTitle } from '../DialogTitle';

import { MatchToStartCard } from '../MatchToStartCard';

export const InitTournamentDialog: FC<any> = ({
  title,
  open,
  onClose,
  matches,
  dates,
  addDateMatches,
  handleChangeDate,
  initAndSaveDatesTournament,
}) => {
  const { classes } = useStyles();

  return (
    <BootstrapDialog onClose={onClose} open={open} PaperProps={{ elevation: 24 }}>
      <BootstrapDialogTitle onClose={onClose} className={classes.title}>
        <Typography color="white" variant="h5" style={{ paddingLeft: 20 }}>
          {title}
        </Typography>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Scroll className={classes.scroll}>
          <Typography variant="body2" color="white" textAlign={'center'}>
            Carga las fechas de los equipos
          </Typography>
          {matches.map((match: any, index: number) => (
            <MatchToStartCard
              key={match.id}
              phase={index + 1}
              match={match}
              handleChangeDate={handleChangeDate}
              date={dates}
            />
          ))}
        </Scroll>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={addDateMatches} className={classes.confirmButton}>
          Guardar
        </Button>
        <Button autoFocus onClick={initAndSaveDatesTournament} className={classes.confirmButton}>
          Guardar e iniciar
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};
