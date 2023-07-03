/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { ChampionshipSelector } from '../../components/ChampionshipSelector';
import { ReviewerMatch as ReviewerMatch } from '../../components/ReviewerMatch';
import { Loader } from '../../components/Loader';
import { MatchSelector } from '../../components/MatchSelector';
import { Navbar } from '../../components/NavBar';
import { API } from '../../services/Championship';
import { API_REVIEWER } from '../../services/ReviewerService';
import { useStyles } from './style';
import { Championship, Match } from '../../interfaces';

export const Reviewer = () => {
  const { classes } = useStyles();
  const [matches, setMatches] = useState<Match[]>([]);
  const [idMatch, setSelected] = useState(null);
  const [championships, setChampionships] = useState<Championship[]>([]);
  const [currentChampionship, setChampionship] = useState<{ id: number; type: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.getChampionships().then(({ data }) => {
      setChampionships(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (currentChampionship) {
      setIsLoading(true);
      interval = setInterval(() => {
        API_REVIEWER.getReviewableMatches(currentChampionship.id).then(({ data }) => {
          setMatches(data);
          setIsLoading(false);
        });
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [currentChampionship]);

  return (
    <Navbar>
      <Grid container className={classes.container}>
        {idMatch ? (
          <ReviewerMatch
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
