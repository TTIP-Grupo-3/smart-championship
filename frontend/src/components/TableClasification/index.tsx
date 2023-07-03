/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableBody } from '@mui/material';
import { useStyles } from './style';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChampionshipScoreService } from '../../services/ChampionshipScore';
import { Loader } from '../Loader';
import { EmptyData } from '../EmptyData';

const columns = ['Equipo', 'PP', 'PG', 'PE', 'PJ'];

export const TableClasification = () => {
  const { classes } = useStyles();
  const service = new ChampionshipScoreService();
  const socket = service.create();
  const { id } = useParams();
  const [teams, setTeams] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    socket.on('teams', (data) => {
      setTeams(data);
      setIsLoading(false);
    });
    service.teams(socket, +id!);
  }, []);

  return (
    <Paper className={classes.paper}>
      {isLoading ? (
        <Loader text="Cargando Equipos" style={{ color: 'orange' }} />
      ) : !teams.length ? (
        <EmptyData emptyText="Contenido no disponible" />
      ) : (
        <TableContainer className={classes.tableContainer}>
          <Table stickyHeader className={classes.table}>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell className={classes.columnHead} key={index}>
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {teams.map((team: any) => (
                <TableRow hover key={team?.id} role="checkbox" tabIndex={-1}>
                  <TableCell key={team?.id} className={classes.rows}>
                    {team?.name}
                  </TableCell>
                  <TableCell className={classes.rows}>{team?.lost}</TableCell>
                  <TableCell className={classes.rows}>{team?.won}</TableCell>
                  <TableCell className={classes.rows}>{team?.tied}</TableCell>
                  <TableCell className={classes.rows}>{team?.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};
