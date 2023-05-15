/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { ChampionshipSelector } from '../../components/ChampionshipSelector';
import { InspectorMatch } from '../../components/InspectorMatch';
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

  useEffect(() => {
    API.getChampionships().then((r) => setChampionships(r.data));
  }, []);

  useEffect(() => {
    if (currentChampionship) {
      API_MATCH.getMatches(currentChampionship.id, currentChampionship.type).then((r) => {
        setMatches(r.data);
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
          <MatchSelector setSelected={setSelected} matches={matches} back={setChampionship} />
        ) : (
          <ChampionshipSelector {...{ championships, setChampionship }} />
        )}
      </Grid>
    </Navbar>
  );
};
