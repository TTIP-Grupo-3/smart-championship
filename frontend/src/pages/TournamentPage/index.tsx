import { Grid, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardTournament } from '../../components/CardTournament';
import { Loader } from '../../components/Loader';
import { Navbar } from '../../components/NavBar';
import { API } from '../../services/Championship';
import { useStyles } from './style';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Championship } from '../../interfaces';
import { EmptyData } from '../../components/EmptyData';

export const Tournaments = () => {
  const [championships, setChampionships] = useState<Championship[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { classes } = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    API.getChampionships().then(({ data }) => {
      setChampionships(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <Navbar
      footer
      button={{
        action: (): void => navigate('/login'),
        text: 'Inscribete',
        icon: (
          <PersonAddIcon
            style={{ height: 22, display: 'flex', color: theme.palette.common.white, paddingRight: 4 }}
          />
        ),
      }}
    >
      {isLoading ? (
        <Loader text="Cargando Torneos" />
      ) : (
        <>
          <Grid container className={classes.grid}>
            <Typography className={classes.titleTournament}>Torneos en curso </Typography>
          </Grid>
          {championships.length === 0 ? (
            <EmptyData emptyText={'Vaya no hay torneos aqui'} />
          ) : (
            <>
              <Grid
                container
                style={{ flexGrow: 1, display: 'flex' }}
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                spacing={2}
                padding={2}
              >
                {championships.map((championship, index: number) => (
                  <CardTournament key={index} championship={championship}></CardTournament>
                ))}
              </Grid>
            </>
          )}
        </>
      )}
    </Navbar>
  );
};
