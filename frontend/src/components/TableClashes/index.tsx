/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid, List, ListItemButton, Typography } from '@mui/material';
import { useStyles } from './style';
import smartLogoLocal from '../../default_match_icon_local.svg';
import smartLogoVisiting from '../../default_match_icon_visiting.svg';
import { API_MATCH } from '../../services/Match';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { MatchDialog } from '../MatchDialog';
import { Loader } from '../Loader';
import { EmptyData } from '../EmptyData';
import { Match } from '../../interfaces';

export const TableClashes = () => {
  const { classes } = useStyles();
  const { id } = useParams();
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchId, setMatchId] = useState<number>();
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    API_MATCH.getMatches(+id!).then(({ data }) => {
      setMatches(data);
      setIsLoading(false);
    });
  }, []);

  const handleClose = () => setOpen(false);

  const handleOpen = (id: number) => {
    setMatchId(id);
    setOpen(true);
  };
  return (
    <Paper className={classes.paper}>
      {isLoading ? (
        <Loader text="Cargando Partidos" style={{ color: 'orange' }} />
      ) : !matches.length ? (
        <EmptyData emptyText="Contenido no disponible" />
      ) : (
        <TableContainer className={classes.tableContainer}>
          <Table stickyHeader className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.columnHead}>Partidos y Resultados</TableCell>
              </TableRow>
            </TableHead>
          </Table>

          <List>
            {matches.map((match, index: number) => {
              return (
                <ListItemButton
                  key={index}
                  className={classes.listItem}
                  onClick={() => handleOpen(match.id)}
                >
                  <Grid className={classes.gridLogo} sx={{ marginLeft: '8%' }}>
                    <img
                      src={
                        match?.local?.logo ? `data:image/png;base64,${match?.local.logo}` : smartLogoLocal
                      }
                      style={{ height: 23, width: 23, borderRadius: '50%' }}
                    ></img>
                    <Typography className={classes.teamName} noWrap>
                      {match.local.name}
                    </Typography>
                  </Grid>
                  <Typography className={classes.score}> {match.local?.goals}</Typography>
                  <Grid className={classes.gridMatch}>
                    <Typography style={{ fontSize: 12 }}>
                      {dayjs(match.date).format('DD/MM/YYYY HH:MM')}
                    </Typography>
                    <Typography className={classes.versus}>VS</Typography>
                  </Grid>
                  <Typography className={classes.score}> {match.visiting?.goals}</Typography>
                  <Grid className={classes.gridLogo} sx={{ marginRight: '8%' }}>
                    <img
                      src={
                        match?.visiting.logo
                          ? `data:image/png;base64,${match.visiting.logo}`
                          : smartLogoVisiting
                      }
                      style={{ height: 23, width: 23, borderRadius: '50%' }}
                    ></img>

                    <Typography className={classes.teamName}>{match.visiting.name}</Typography>
                  </Grid>
                </ListItemButton>
              );
            })}
          </List>
          <MatchDialog
            open={open}
            close={handleClose}
            matchId={matchId}
            championshipData={{ id, type: 'score' }}
          ></MatchDialog>
        </TableContainer>
      )}
    </Paper>
  );
};
