import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid, List, ListItem, Typography } from '@mui/material';

const rows = [
  { date: '12/5/23 15:30hs', local: { name: 'Chile', score: 0 }, visiting: { name: 'Bolivia', score: 0 } },
  { date: '12/5/23 17:30hs', local: { name: 'Francia', score: 0 }, visiting: { name: 'España', score: 0 } },
  { date: '12/5/23 19:30hs', local: { name: 'Peru', score: 0 }, visiting: { name: 'Colombia', score: 0 } },
  { date: '12/5/23 21:30hs', local: { name: 'Croacia', score: 0 }, visiting: { name: 'Brasil', score: 0 } },
  { date: '12/5/23 23:30hs', local: { name: 'Mexico', score: 0 }, visiting: { name: 'Ecuador', score: 0 } },
];

export const TableClashes = () => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 380 }}>
        <Table stickyHeader style={{ backgroundColor: 'white', color: 'black' }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: '#bf360c', color: 'white' }}>
                Partidos y Resultados
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>

        <List>
          {rows.map((row) => {
            return (
              <ListItem
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'black',
                  color: 'white',
                  height: 60,
                  marginTop: 10,
                  width: '100%',
                }}
              >
                <Typography
                  style={{
                    justifyContent: 'center',
                    minWidth: '30%',
                    textAlign: 'center',

                    display: 'flex',
                    backgroundColor: 'black',
                    color: 'white',
                    marginTop: 22,
                  }}
                >
                  {row.local.name}
                </Typography>
                <Typography
                  style={{
                    justifyContent: 'center',

                    display: 'flex',
                    backgroundColor: 'black',
                    color: 'white',
                    textAlign: 'center',
                    marginTop: 22,
                    flexGrow: 1,
                  }}
                >
                  {' '}
                  {row.local.score}
                </Typography>
                <Grid
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography style={{ fontSize: 12 }}>{row.date}</Typography>
                  <Typography
                    style={{
                      textAlign: 'center',
                      justifyContent: 'center',

                      display: 'flex',
                      backgroundColor: 'black',
                      color: 'white',
                      flexGrow: 2,
                    }}
                  >
                    VS
                  </Typography>
                </Grid>
                <Typography
                  style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    marginTop: 22,
                    display: 'flex',
                    backgroundColor: 'black',
                    color: 'white',

                    flexGrow: 1,
                  }}
                >
                  {' '}
                  {row.visiting.score}
                </Typography>
                <Typography
                  style={{
                    marginTop: 22,
                    textAlign: 'center',
                    justifyContent: 'center',
                    minWidth: '30%',
                    display: 'flex',
                    backgroundColor: 'black',
                    color: 'white',
                  }}
                >
                  {row.visiting.name}
                </Typography>
              </ListItem>
            );
          })}
        </List>
      </TableContainer>
    </Paper>
  );
};

/*
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
 */
