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
import { containsOnlyNumbers, onlyText } from '../../utils/utils';
import { TypeChampionship } from '../../interfaces';
import { Loader } from '../Loader';

export const TournamentDialog: FC<any> = ({
  title,
  open,
  onClose,
  promise,
  id,
  onSuccess,
  isEdit,
  reloadChampionships,
}) => {
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
  const [payment, setPayment] = useState<any>({ username: '', cbu: '', alias: '', cuit: '' });
  const [loading, setIsLoading] = useState(false);

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

  const handleChangePayment = (e: any) => {
    const { target } = e;
    if (target.name === 'cuit' || target.name === 'cbu') {
      containsOnlyNumbers(target.value) &&
        setPayment((prev: any) => ({ ...prev, [target.name]: target.value }));
    } else {
      setPayment((prev: any) => ({ ...prev, [target.name]: target.value }));
    }
  };

  const handleChangeUsername = (e: any) => {
    const { target } = e;
    onlyText(target.value) && setPayment((prev: any) => ({ ...prev, username: target.value }));
  };

  const createTournament = () => {
    const { username, ...otherPayment } = payment;
    const tournament = { ...newTournament, payData: { name: username, ...otherPayment } };
    promise(API_ADMIN.createChampionship(tournament), {
      loading: 'Creando torneo...',
      success: () => {
        onClose();
        onSuccess('Torneo creado con éxito!');
        reloadChampionships();
      },
      error: 'Error al crear el torneo',
    });
  };

  const editTournament = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { type, ...editedTournament } = newTournament;
    const { username, ...otherPayment } = payment;
    const tournament = { ...editedTournament, payData: { name: username, ...otherPayment } };

    promise(API_ADMIN.editChampionship(id, tournament), {
      loading: 'Actualizando cambios',
      success: () => {
        onClose();
        onSuccess('Torneo actualizado con éxito!');
        reloadChampionships();
      },
      error: 'Error al actualizar el torneo',
    });
  };

  const disabledCreate =
    newTournament.name === '' ||
    newTournament.price === 0 ||
    newTournament.duration === 0 ||
    newTournament.size === 0 ||
    payment.username.trim() === '' ||
    payment.cbu.trim().length < 22 ||
    payment.alias.trim().length === 0 ||
    payment.cuit.trim().length < 11;

  useEffect(() => {
    if (id && isEdit) {
      setIsLoading(true);
      API_ADMIN.getAdminChampionship(id).then(({ data }) => {
        const { payData, ...otherData } = data;
        const { name, ...otherPayment } = payData;
        setDataTournament(otherData);
        setPayment({ username: name, ...otherPayment });
        setIsLoading(false);
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
          {loading ? (
            <Loader text="Cargando informacion del torneo" />
          ) : (
            <>
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
                placeholder={'50'}
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
              {!isEdit && (
                <>
                  {' '}
                  <Typography color="white" paddingTop={2}>
                    Modalidad de torneo:
                  </Typography>
                  <SelectTournamentType value={newTournament.type} onChange={handleChange} name="type" />
                </>
              )}
              <Typography gutterBottom color="white" paddingTop={2}>
                Equipos :
              </Typography>
              {newTournament.type === TypeChampionship.SCORE ? (
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
              <Typography color="white" paddingTop={2}>
                Metodo de cobro:
              </Typography>
              <OutlinedInput
                required
                className={classes.root}
                variant="outlined"
                label="Nombre y apellido"
                name="username"
                value={payment.username}
                onChange={handleChangeUsername}
                inputProps={{ inputMode: 'text', pattern: '[a-zA-Z ]{2,254}' }}
                placeholder="Cosme Fulanito"
              />
              <OutlinedInput
                required
                className={classes.root}
                variant="outlined"
                label="CBU"
                name="cbu"
                value={payment.cbu}
                onChange={handleChangePayment}
                inputProps={{
                  inputMode: 'text',
                  pattern: '[0-9]+',
                  maxLength: 22,
                }}
                placeholder="CBU o CVU de tu cuenta"
              />
              <OutlinedInput
                required
                className={classes.root}
                variant="outlined"
                label="Alias"
                name="alias"
                value={payment.alias}
                onChange={handleChangePayment}
                inputProps={{ inputMode: 'text', pattern: '[a-zA-Z ]{2,254}' }}
                placeholder="Alias de tu cuenta"
              />
              <OutlinedInput
                required
                className={classes.root}
                variant="outlined"
                label="Cuit"
                name="cuit"
                value={payment.cuit}
                onChange={handleChangePayment}
                inputProps={{ inputMode: 'text', pattern: '[0-9]*', maxLength: 11 }}
                placeholder="CUIT o CUIL de tu cuenta"
              />{' '}
            </>
          )}
        </Scroll>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={id ? editTournament : createTournament}
          disabled={disabledCreate || loading}
          className={classes.confirmButton}
        >
          Confirmar
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};
