/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Grid, Typography } from '@mui/material';
import { Navbar } from '../../components/NavBar';
import { useStyles } from './style';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from 'react';
import defaultUpload from '../../upload.jpg';
import { API_TEAM_LEADER } from '../../services/TeamLeader';
import { useNavigate, useParams } from 'react-router-dom';
export const UploadReceipt = () => {
  const { classes } = useStyles();
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState<string>('');
  const { id, enrollId } = useParams();
  const navigate = useNavigate();

  const handleFile = (e: any) => {
    const files = e.target.files[0];
    setFile(files);
    setImage(URL.createObjectURL(files));
  };

  const uploadReceipt = () => {
    API_TEAM_LEADER.uploadReceipt(+id!, +enrollId!).then(() => navigate('/leader'));
  };

  return (
    <Navbar>
      <Grid className={classes.grid}>
        <Typography className={classes.reservationTitle}>Subir comprobante de pago</Typography>
        <Grid container className={classes.gridSuccess}>
          <CheckCircleIcon className={classes.checkIcon} />
          <Typography className={classes.successReservation}>
            Listo!, tu lugar esta reservado , tienes hasta "fecha" para poder subir el comprobante , caso
            contrario perderas tu reservacion
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
      </Grid>
    </Navbar>
  );
};
