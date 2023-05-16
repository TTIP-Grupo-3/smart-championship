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

export const TableClashes = () => {
  const { classes } = useStyles();
  const { id } = useParams();
  const [matches, setMatches] = useState([]);
  const [matchId, setMatchId] = useState<number>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    API_MATCH.getMatches(+id!, 'score').then((r) => setMatches(r.data));
  }, []);

  const handleClose = () => setOpen(false);

  const handleOpen = (id: number) => {
    setMatchId(id);
    setOpen(true);
  };

  return (
    <Paper className={classes.paper}>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.columnHead}>Partidos y Resultados</TableCell>
            </TableRow>
          </TableHead>
        </Table>

        <List>
          {matches.map((row: any) => {
            return (
              <ListItemButton className={classes.listItem} onClick={() => handleOpen(row.id)}>
                <Grid className={classes.gridLogo} sx={{ marginLeft: '8%' }}>
                  <img src={smartLogoLocal} style={{ height: 23, width: 23 }}></img>
                  <Typography className={classes.teamName}>{row.local.name}</Typography>
                </Grid>
                <Typography className={classes.score}> {row.local.score}</Typography>
                <Grid className={classes.gridMatch}>
                  <Typography style={{ fontSize: 12 }}>
                    {dayjs(row.date).format('DD/MM/YYYY HH:MM')}
                  </Typography>
                  <Typography className={classes.versus}>VS</Typography>
                </Grid>
                <Typography className={classes.score}> {row.visiting.score}</Typography>
                <Grid className={classes.gridLogo} sx={{ marginRight: '8%' }}>
                  <img src={smartLogoVisiting} style={{ height: 23, width: 23 }}></img>

                  <Typography className={classes.teamName}>{row.visiting.name}</Typography>
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
    </Paper>
  );
};
