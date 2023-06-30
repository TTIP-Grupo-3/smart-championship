/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Grid, Typography, useTheme } from '@mui/material';
import { Navbar } from '../../components/NavBar';
import { useStyles } from './style';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ChangeEventHandler, useState } from 'react';
import defaultUpload from '../../upload.jpg';
import { API_TEAM_LEADER } from '../../services/TeamLeader';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ConfirmationReceiptDialog } from '../../components/ConfirmationSendReceiptDialog';

export const UploadReceipt = () => {
  const { classes } = useStyles();
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState<string>('');
  const { id, enrollId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const handleFile: ChangeEventHandler<HTMLInputElement> = (e): void => {
    const files = e.target.files![0];
    setFile(files);
    setImage(URL.createObjectURL(files));
  };

  const uploadReceipt = (): void => {
    setOpenConfirmation(true);
    const formdata = new FormData();
    formdata.append('receipt', file!);
    API_TEAM_LEADER.uploadReceipt(+id!, +enrollId!, formdata).then(() => navigate('/leader'));
  };

  return (
    <Navbar
      button={{
        action: () => navigate(`/leader/enrolling/reservation/${id}`),
        text: 'Volver',
        icon: (
          <ArrowBackIosIcon style={{ height: 18, display: 'flex', color: theme.palette.common.white }} />
        ),
      }}
    >
      <Grid className={classes.grid}>
        <Typography className={classes.reservationTitle}>Subir comprobante de pago</Typography>
        <Grid container className={classes.gridSuccess}>
          <CheckCircleIcon className={classes.checkIcon} />
          <Typography className={classes.successReservation}>
            Listo!, tu lugar esta reservado , tienes 1 hora para poder subir el comprobante , caso contrario
            perderas tu reservacion.
          </Typography>
        </Grid>
        <Grid container className={classes.buttonReservationGrid}>
          <img
            id="img"
            width={'280px'}
            height={'280px'}
            style={{ borderRadius: 4 }}
            src={!file ? defaultUpload : image}
            alt="image uploaded"
          />
          <Grid container className={classes.buttons}>
            <Button variant="contained" component="label" className={classes.confirmUpload}>
              Subir
              <input type="file" hidden onChange={handleFile} accept="image/*" />
            </Button>
            <Button className={classes.confirmUpload} disabled={!file} onClick={uploadReceipt}>
              Enviar Comprobante
            </Button>
          </Grid>
        </Grid>
        <ConfirmationReceiptDialog open={openConfirmation} setOpen={setOpenConfirmation} />
      </Grid>
    </Navbar>
  );
};
