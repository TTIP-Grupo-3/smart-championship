import * as React from 'react';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState } from 'react';
import { SelectorNumber } from '../SelectorNumber';
import { SelectTournamentType } from '../SelectTournamentType';
import { useStyles } from './style';
import Scroll from '../Scroll';
import { BootstrapDialog } from '../StyledDialog';
import { BootstrapDialogTitle } from '../DialogTitle';
import { OutlinedInput } from '../OutlinedInput';
import dayjs, { Dayjs } from 'dayjs';
import { DateTime } from '../DateTime';
import { API_ADMIN } from '../../services/Admin';
import { containsOnlyNumbers } from '../../utils/utils';

export const TournamentDialog: FC<any> = ({ title, open, onClose, onSuccess, onError, id }) => {
  const { classes } = useStyles();
  const dateToIso = (date: Dayjs) => date.toISOString();
  const [newTournament, setDataTournament] = useState({
    name: '',
    type: 'elimination',
    date: dayjs().toISOString(),
    size: 16,
    price: 0,
    duration: 0,
    teamSize: 5,
  });
  const handleChange = (event: any) => {
    const { target } = event;
    setDataTournament((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleNumberChange = (e: any) => {
    const { target } = e;
    (containsOnlyNumbers(target.value) || target.value === '') &&
      setDataTournament((prev) => ({ ...prev, [target.name]: +target.value }));
  };

  const handleChangeDate = (e: any) => {
    setDataTournament((prev) => ({ ...prev, date: dateToIso(dayjs(e)) }));
  };

  const createTournament = () => {
    API_ADMIN.createChampionship(newTournament)
      .then(() => {
        onSuccess();
        onClose();
      })
      .catch(() => {
        onError();
      });
  };

  const editTournament = () => {
    API_ADMIN.editChampionship(id, newTournament)
      .then(() => {
        onSuccess();
        onClose();
      })
      .catch(() => {
        onError();
      });
  };

  useEffect(() => {
    if (id) {
      API_ADMIN.getAdminChampionship(id).then((r) => {
        setDataTournament(r.data);
      });
    }
  }, []);
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
            name="name"
            value={newTournament.name}
            onChange={handleChange}
            placeholder="Torneo Smart Championship"
          />
          <Typography color="white" paddingTop={2} paddingBottom={2}>
            Duracion por partido :
          </Typography>
          <OutlinedInput
            required
            variant="outlined"
            className={classes.root}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            label="Minutos"
            name="duration"
            value={newTournament.duration}
            onChange={handleNumberChange}
            placeholder={50}
          />

          <Typography color="white" paddingTop={2} paddingBottom={2}>
            Fecha de Inicio:
          </Typography>
          <DateTime value={dayjs(newTournament.date)} onChange={handleChangeDate} />
          <Typography color="white" paddingTop={2} paddingBottom={2}>
            Precio de inscripción:
          </Typography>
          <OutlinedInput
            required
            className={classes.root}
            variant="outlined"
            label="Monto"
            name="price"
            value={newTournament.price}
            onChange={handleNumberChange}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            placeholder="un monto en pesos"
          />
          <Typography color="white" paddingTop={2}>
            Modalidad de torneo:
          </Typography>
          <SelectTournamentType value={newTournament.type} onChange={handleChange} name="type" />
          <Typography gutterBottom color="white" paddingTop={2}>
            Equipos :
          </Typography>
          {newTournament.type === 'score' ? (
            <OutlinedInput
              required
              className={classes.root}
              variant="outlined"
              label="Cantidad"
              name="size"
              value={newTournament.size}
              onChange={handleNumberChange}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              placeholder="10 Equipos"
            />
          ) : (
            <SelectorNumber
              value={newTournament.size}
              onChange={handleChange}
              name="size"
              isTeamSelector
              options={[2, 4, 8, 16, 32]}
              defaultValue={16}
            />
          )}
          <Typography color="white" variant="body2" paddingTop={2}>
            Cantidad de jugadores
          </Typography>
          <SelectorNumber
            value={newTournament.teamSize}
            onChange={handleChange}
            name="teamSize"
            options={[5, 6, 7, 8, 9, 10, 11]}
            defaultValue={5}
          />
        </Scroll>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={id ? editTournament : createTournament}
          className={classes.confirmButton}
        >
          Confirmar
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};
