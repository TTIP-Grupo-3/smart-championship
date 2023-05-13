/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { InspectorMatch } from '../../components/InspectorMatch';
import { MatchSelector } from '../../components/MatchSelector';
import { Navbar } from '../../components/NavBar';
import { API_MATCH } from '../../services/Match';
import { useStyles } from './style';

export const Veedor = () => {
  const { classes } = useStyles();
  const [matches, setMatches] = useState([]);
  const [idMatch, setSelected] = useState(null);

  useEffect(() => {
    API_MATCH.getMatches(1).then((r) => {
      setMatches(r.data);
    });
  }, []);

  return (
    <Navbar>
      <Grid container className={classes.container}>
        {idMatch ? (
          <InspectorMatch {...{ idMatch, setSelected }} />
        ) : (
          <MatchSelector setSelected={setSelected} matches={matches} />
        )}
      </Grid>
    </Navbar>
  );
};
