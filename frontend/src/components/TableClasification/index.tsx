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

interface Column {
  id: 'name' | 'population' | 'size' | 'density' | 'density2';
  label: string;
  minWidth?: any;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Equipo', minWidth: '40%' },
  {
    id: 'population',
    label: 'PP',
    minWidth: '30%',
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'PG',
    minWidth: '30%',
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'PE',
    minWidth: '30%',
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },

  {
    id: 'density2',
    label: 'PJ',
    minWidth: '30%',
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

export const TableClasification = () => {
  const { classes } = useStyles();
  const service = new ChampionshipScoreService();
  const socket = service.create();
  const { id } = useParams();
  const [teams, setTeams] = useState<any>([]);

  useEffect(() => {
    socket.on('teams', (data) => setTeams(data));
    service.teams(socket, +id!);
  }, []);

  return (
    <Paper className={classes.paper}>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader className={classes.table}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell className={classes.columnHead} key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map((team: any) => (
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell key={team?.id} align="left" className={classes.rows}>
                  {team?.name}
                </TableCell>
                <TableCell align="right" className={classes.rows}>
                  {team?.lost}
                </TableCell>
                <TableCell align="right" className={classes.rows}>
                  {team?.won}
                </TableCell>
                <TableCell align="right" className={classes.rows}>
                  {team?.tied}
                </TableCell>
                <TableCell align="right" className={classes.rows}>
                  {team?.score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
