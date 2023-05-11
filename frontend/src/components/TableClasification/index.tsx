import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableBody } from '@mui/material';
import { useStyles } from './style';

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

function createData(
  name: string,
  density2: number,
  population: number,
  size: number,
  density: number,
): any {
  return { name, density2, population, size, density };
}

const rows = [
  createData('India', 3, 1, 1, 3),
  createData('China', 2, 1, 1, 3),
  createData('Italia', 2, 1, 1, 3),
  createData('Francia', 2, 1, 1, 3),
  createData('España', 2, 1, 1, 3),
  createData('Chile', 2, 1, 1, 3),
  createData('Bolivia', 2, 1, 1, 3),
  createData('Mexico', 2, 1, 1, 3),
  createData('Marruecos', 2, 1, 1, 3),
  createData('Colombia', 2, 1, 1, 3),
  createData('Ecuador', 2, 1, 1, 3),
  createData('Peru', 2, 1, 1, 3),
  createData('Dinamarca', 2, 1, 1, 3),
];

export const TableClasification = () => {
  const { classes } = useStyles();
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
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} className={classes.rows}>
                      {row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
