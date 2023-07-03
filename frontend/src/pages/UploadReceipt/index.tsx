/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Grid, Typography } from '@mui/material';
import { Navbar } from '../../components/NavBar';
import { useStyles } from './style';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ChangeEventHandler, useEffect, useState } from 'react';
import defaultUpload from '../../upload.jpg';
import { API_TEAM_LEADER } from '../../services/TeamLeader';
import { useParams } from 'react-router-dom';
import { ConfirmationReceiptDialog } from '../../components/ConfirmationSendReceiptDialog';
import Scroll from '../../components/Scroll';

export const UploadReceipt = () => {
  const { classes } = useStyles();
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState<string>('');
  const { id, enrollId } = useParams();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [payment, setPayment] = useState<any>();

  const handleFile: ChangeEventHandler<HTMLInputElement> = (e): void => {
    const files = e.target.files![0];
    setFile(files);
    setImage(URL.createObjectURL(files));
  };

  const uploadReceipt = (): void => {
    const formdata = new FormData();
    formdata.append('receipt', file!);
    API_TEAM_LEADER.uploadReceipt(+id!, +enrollId!, formdata).then(() => setOpenConfirmation(true));
  };

  useEffect(() => {
    if (id) {
      API_TEAM_LEADER.getEnrollment(+id!, +enrollId!).then(({ data }) => {
        setPayment(data.payData);
      });
    }
  }, [id]);

  return (
    <Navbar>
      <Grid className={classes.grid}>
        <Typography className={classes.reservationTitle}>Subir comprobante de pago</Typography>
        <Grid container className={classes.gridSuccess}>
          <CheckCircleIcon className={classes.checkIcon} />
          <Typography className={classes.successReservation}>
            Listo!, tu lugar esta reservado , tienes 1 hora para poder subir el comprobante , caso contrario
            perderas tu reservacion.
          </Typography>
        </Grid>
        <Grid container className={classes.buttonReservationGrid} spacing={4}>
          <Grid item style={{ flexDirection: 'column', display: 'flex' }}>
            <Scroll style={{ height: 240, width: 320 }}>
              <img
                id="img"
                height={!file ? '100%' : 'auto'}
                style={{ borderRadius: 4, paddingBottom: 10 }}
                src={!file ? defaultUpload : image}
                alt="image uploaded"
              />
            </Scroll>
            <Button
              variant="contained"
              component="label"
              style={{ backgroundColor: '#1990BB', width: 320 }}
            >
              Subir comprobante
              <input type="file" hidden onChange={handleFile} accept="image/*" />
            </Button>
          </Grid>
          <Grid item>
            <Grid container className={classes.gridPayment} padding={2}>
              <Typography color="white" paddingBottom={2} fontWeight={600}>
                Transfiere el pago a la siguiente cuenta:
              </Typography>
              <Typography color="white" paddingBottom={2}>
                Propietario : {payment?.name}
              </Typography>

              <Typography color="white" paddingBottom={2}>
                CBU: {payment?.cbu}
              </Typography>
              <Typography color="white" paddingBottom={2}>
                Alias: {payment?.alias}
              </Typography>
              <Typography color="white" paddingBottom={2}>
                CUIL: {payment?.cuit}
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.buttons}>
            <Button
              className={classes.confirmUpload}
              style={{ marginLeft: '2%' }}
              disabled={!file}
              onClick={uploadReceipt}
            >
              Enviar Comprobante
            </Button>
          </Grid>
        </Grid>
        <ConfirmationReceiptDialog open={openConfirmation} setOpen={setOpenConfirmation} />
      </Grid>
    </Navbar>
  );
};
