/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { useStyles } from './style';
import { Navbar } from '../../components/NavBar';
import Scroll from '../../components/Scroll';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminInscriptionCard } from '../../components/AdminInscriptionCard';
import { API_ADMIN_ENROLLMENT } from '../../services/AdminEnrollment';
import { DialogInscription } from '../../components/DialogInscription';
import { delay, msgTypes } from '../Admin';
import SnackBar from '../../components/Snackbar';

export const AdminInscription: FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [idEnroll, setIdEnroll] = useState<any>();
  const [openS, setOpenS] = useState<any>({ open: false, type: 'success' });
  const { championshipId } = useParams();

  useEffect(() => {
    API_ADMIN_ENROLLMENT.getAdminEnrollments(+championshipId!).then((r: any) => setEnrollments(r.data));
  }, []);

  const extra = {
    username: 'Diego Moronha',
    created_at: new Date().toISOString(),
    tournamentRequested: 'Torneo futbol 11',
    type: 'Clasificacion',
  };

  const onClose = () => setOpen(false);
  const handleOpen = (id: number) => {
    setIdEnroll(id);
    setOpen(true);
  };

  const onSuccess = async () => {
    setOpenS({ open: true, type: 'success' });
    API_ADMIN_ENROLLMENT.getAdminEnrollments(+championshipId!).then((r: any) => setEnrollments(r.data));
    onClose();
    await delay(1000);
    setOpenS({ open: false, type: 'success' });
  };

  const onError = async () => {
    setOpenS({ open: true, type: 'error' });
    onClose();
    await delay(1000);
    setOpenS({ open: false, type: 'error' });
  };

  return (
    <Navbar button={{ action: () => navigate('/admin/tournaments'), text: 'mis torneos' }}>
      <Grid className={classes.grid}>
        <Grid className={classes.header}>
          <Typography variant="h6" className={classes.title}>
            Inscripciones
          </Typography>
        </Grid>
        <Grid className={classes.card}>
          <Scroll className={classes.scroll}>
            {enrollments.map((enrollment: any) => (
              <AdminInscriptionCard key={enrollment.id} {...{ ...enrollment, ...extra, handleOpen }} />
            ))}
          </Scroll>
        </Grid>
        {open && (
          <DialogInscription
            open={open}
            {...{ onClose, onError, onSuccess, idEnroll }}
            championshipId={+championshipId!}
          />
        )}
      </Grid>
      <SnackBar
        open={openS.open}
        vertical={'bottom'}
        horizontal={'center'}
        msgSnack={msgTypes[openS.type]}
        type={openS.type}
        handleClose={() => setOpenS((prev: any) => ({ ...prev, open: false }))}
      />
    </Navbar>
  );
};
