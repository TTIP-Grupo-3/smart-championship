/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { ChampionshipSelector } from '../../components/ChampionshipSelector';
import { InspectorMatch } from '../../components/InspectorMatch';
import { Loader } from '../../components/Loader';
import { MatchSelector } from '../../components/MatchSelector';
import { Navbar } from '../../components/NavBar';
import { API } from '../../services/Championship';
import { API_MATCH } from '../../services/Match';
import { useStyles } from './style';

export const Veedor = () => {
  const { classes } = useStyles();
  const [matches, setMatches] = useState([]);
  const [idMatch, setSelected] = useState(null);
  const [championships, setChampionships] = useState([]);
  const [currentChampionship, setChampionship] = useState<{ id: number; type: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.getChampionships().then((r) => {
      setChampionships(r.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (currentChampionship) {
      setIsLoading(true);
      API_MATCH.getMatches(currentChampionship.id).then((r) => {
        setMatches(r.data);
        setIsLoading(false);
      });
    }
  }, [currentChampionship]);

  return (
    <Navbar>
      <Grid container className={classes.container}>
        {idMatch ? (
          <InspectorMatch
            {...{
              idMatch,
              setSelected,
              championshipId: currentChampionship!.id,
              type: currentChampionship!.type,
            }}
          />
        ) : currentChampionship ? (
          isLoading ? (
            <Loader text="Cargando Partidos" style={{ color: '#bf360c' }} />
          ) : (
            <MatchSelector
              setSelected={setSelected}
              matches={matches}
              back={setChampionship}
              isLoading={isLoading}
            />
          )
        ) : isLoading ? (
          <Loader text="Cargando torneos" style={{ color: '#bf360c' }} />
        ) : (
          <ChampionshipSelector {...{ championships, setChampionship }} />
        )}
      </Grid>
    </Navbar>
  );
};
