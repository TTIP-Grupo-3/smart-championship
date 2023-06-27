import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';
import { useStyles } from './style';
import Scroll from '../Scroll';
import { BootstrapDialog } from '../StyledDialog';
import { BootstrapDialogTitle } from '../DialogTitle';
import dayjs, { Dayjs } from 'dayjs';
import { DateTime } from '../DateTime';
import { Grid } from '@mui/material';

export const InitTournamentDialog: FC<any> = ({ title, open, onClose, initTournament }) => {
  const { classes } = useStyles();
  const dateToIso = (date: Dayjs) => date.toISOString();
  const [newTournament, setDataTournament] = useState({
    date: dayjs().toISOString(),
  });

  const handleChangeDate = (e: any) => {
    setDataTournament((prev) => ({ ...prev, date: dateToIso(dayjs(e)) }));
  };

  return (
    <BootstrapDialog onClose={onClose} open={open} PaperProps={{ elevation: 24 }}>
      <BootstrapDialogTitle onClose={onClose} className={classes.title}>
        <Typography color="white" variant="h5" style={{ paddingLeft: 20 }}>
          {title}
        </Typography>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Scroll className={classes.scroll}>
          <Typography color="white" paddingTop={2} paddingBottom={2}>
            Fecha de Inicio:
          </Typography>
          <Grid container justifyContent="center" alignItems="center" direction={'column'}>
            <DateTime value={dayjs(newTournament.date)} onChange={handleChangeDate} />
            <Typography color="white" alignItems={'center'} padding={1}>
              Equipo 1 vs Equipo 2
            </Typography>
            <DateTime value={dayjs(newTournament.date)} onChange={handleChangeDate} />
            <Typography color="white" alignItems={'center'} padding={1}>
              Equipo 3 vs Equipo 4
            </Typography>
            <DateTime value={dayjs(newTournament.date)} onChange={handleChangeDate} />
            <Typography color="white" alignItems={'center'} padding={1}>
              Equipo 5 vs Equipo 6
            </Typography>
          </Grid>
        </Scroll>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={initTournament} className={classes.confirmButton}>
          Confirmar
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};
