import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { List, ListItem } from '@mui/material';

interface Column {
  id: 'name' | 'population' | 'size' | 'density' | 'density2';
  label: string;
  minWidth?: any;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Equipo', minWidth: 170 },
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
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  population: number;
  size: number;
  density: number;
  density2: string;
}

function createData(name: string, density2: string, population: number, size: number): Data {
  const density = population / size;
  return { name, population, size, density, density2 };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

export const TableClasification = () => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 380 }}>
        <Table stickyHeader style={{ backgroundColor: 'white', color: 'black' }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  style={{ backgroundColor: 'brown', color: 'white', minWidth: column.minWidth }}
                  key={column.id}
                  align={column.align}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
        <List>
          {rows.map((row) => {
            return (
              <ListItem
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  height: 60,
                  marginTop: 10,
                  width: '100%',
                }}
              >
                equipo 1
              </ListItem>
            );
          })}
        </List>
      </TableContainer>
    </Paper>
  );
};
