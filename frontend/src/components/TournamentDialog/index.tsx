import * as React from 'react';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { SelectorNumber } from '../SelectorNumber';
import { SelectTournamentType } from '../SelectTournamentType';
import { useStyles } from './style';
import Scroll from '../Scroll';
import { BootstrapDialog } from '../StyledDialog';
import { BootstrapDialogTitle } from '../DialogTitle';
import { OutlinedInput } from '../OutlinedInput';

export const TournamentDialog: FC<any> = ({ title, open, onClose }) => {
  const { classes } = useStyles();
  const [tournamentType, setTournamentType] = useState<number>(1);

  const handleChange = (event: SelectChangeEvent<number>) => {
    const {
      target: { value },
    } = event;
    setTournamentType(+value);
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
          <OutlinedInput
            required
            variant="outlined"
            label="Nombre del torneo"
            onChange={() => {
              console.log('');
            }}
            placeholder="Torneo Smart Championship"
          />

          <Typography color="white" paddingTop={2}>
            Modalidad de torneo:
          </Typography>
          <SelectTournamentType value={tournamentType} onChange={handleChange} />
          <Typography gutterBottom color="white" paddingTop={2}>
            Equipos :
          </Typography>
          {tournamentType === 2 ? (
            <OutlinedInput
              required
              className={classes.root}
              variant="outlined"
              label="Cantidad"
              onChange={() => {
                console.log('');
              }}
              type="number"
              placeholder="10 Equipos"
            />
          ) : (
            <SelectorNumber isTeamSelector options={[2, 4, 8, 16, 32]} defaultOption={16} />
          )}
          <Typography color="white" variant="body2" paddingTop={2}>
            Cantidad de jugadores
          </Typography>
          <SelectorNumber options={[5, 6, 7, 8, 9, 10, 11]} defaultOption={5} />
        </Scroll>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} className={classes.confirmButton}>
          Confirmar
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};
