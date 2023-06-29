import { Button, Grid, Typography } from '@mui/material';
import { FC, Fragment, useState } from 'react';
import { delay } from '../../pages/Admin';
import { EnrollmentTeamDialog } from '../EnrollTeamDialog';
import SnackBar from '../Snackbar';
import { useStyles } from './style';

export const msgTypes: any = {
  success: 'Equipo agregado correctamente',
  error: 'Ha ocurrido un error intenta mas tarde',
};

export const EmptyTeam: FC<any> = ({ handleCreate, open, setOpen, reload }) => {
  const { classes } = useStyles();
  const [openS, setOpenS] = useState<any>({ open: false, type: 'success' });

  const onSuccess = async () => {
    onClose();
    reload();
    setOpenS({ open: true, type: 'success' });
    await delay(2000);
    setOpenS({ open: false, type: 'success' });
  };

  const onError = async () => {
    onClose();
    setOpenS({ open: true, type: 'error' });
    await delay(2000);
    setOpenS({ open: false, type: 'error' });
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Grid container className={classes.emptyTeamGrid}>
        <Typography color="white" padding={2}>
          Notamos que no tienes ningun equipo.
        </Typography>
        <Button className={classes.createTeam} onClick={handleCreate}>
          <Typography className={classes.buttonText}>Crea Tu Primer Equipo</Typography>
        </Button>
        <EnrollmentTeamDialog {...{ onSuccess, onError, onClose, open }} />
      </Grid>
      <SnackBar
        open={openS.open}
        vertical={'bottom'}
        horizontal={'center'}
        msgSnack={msgTypes[openS.type]}
        type={openS.type}
        handleClose={() => setOpenS((prev: any) => ({ ...prev, open: false }))}
      />
    </Fragment>
  );
};
