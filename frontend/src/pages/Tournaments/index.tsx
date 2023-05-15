import { Grid } from '@mui/material';
import { CardTournament } from '../../components/CardTournament';
import { Navbar } from '../../components/NavBar';

export const Tournaments = () => {
  return (
    <Navbar>
      <Grid
        container
        style={{ flexGrow: 1, display: 'flex' }}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        padding={2}
      >
        <CardTournament
          tournamentType="eliminacion"
          title="Torneo Futbol 11"
          description="Especial para amigos que quieran pasar un buen momento en el dia"
        />
        <CardTournament
          tournamentType="clasificacion"
          title="Torneo Futbol 11"
          description="Especial para grandes amigos con mucho tiempo y ganas de jugar"
        />
        <CardTournament
          tournamentType="clasificacion"
          title="Torneo Futbol 9"
          description="Para equipos en busca de nuevos desafios que quieran ingresar en canchas mas grandes"
        />
        <CardTournament
          tournamentType="eliminacion"
          title="Torneo Futbol 7"
          description="Para equipos que recien estan queriendo empezar con torneos"
        />
        <CardTournament
          tournamentType="clasificacion"
          title="Torneo Futbol 5"
          description="Ideal para todo tipo de jugadores, con ganas de compartir con la familia"
        />
        <CardTournament
          tournamentType="eliminacion"
          title="Torneo Futbol 8"
          description="Dinamico economico y con grandes premios,no te lo podes perder"
        />
      </Grid>
    </Navbar>
  );
};
