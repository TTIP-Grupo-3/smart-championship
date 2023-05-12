import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid, List, ListItem, Typography } from '@mui/material';
import { useStyles } from './style';
import smartLogoLocal from '../../default_match_icon_local.svg';
import smartLogoVisiting from '../../default_match_icon_visiting.svg';

const rows = [
  { date: '12/5/23 15:30hs', local: { name: 'Chile', score: 0 }, visiting: { name: 'Bolivia', score: 0 } },
  { date: '12/5/23 17:30hs', local: { name: 'Francia', score: 0 }, visiting: { name: 'España', score: 0 } },
  { date: '12/5/23 19:30hs', local: { name: 'Peru', score: 0 }, visiting: { name: 'Colombia', score: 0 } },
  { date: '12/5/23 21:30hs', local: { name: 'Croacia', score: 0 }, visiting: { name: 'Brasil', score: 0 } },
  { date: '12/5/23 23:30hs', local: { name: 'Mexico', score: 0 }, visiting: { name: 'Ecuador', score: 0 } },
];

export const TableClashes = () => {
  const { classes } = useStyles();
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
          {rows.map((row) => {
            return (
              <ListItem className={classes.listItem}>
                <Grid className={classes.gridLogo} sx={{ marginLeft: '8%' }}>
                  <img src={smartLogoLocal} style={{ height: 23, width: 23 }}></img>
                  <Typography className={classes.teamName}>{row.local.name}</Typography>
                </Grid>
                <Typography className={classes.score}> {row.local.score}</Typography>
                <Grid className={classes.gridMatch}>
                  <Typography style={{ fontSize: 12 }}>{row.date}</Typography>
                  <Typography className={classes.versus}>VS</Typography>
                </Grid>
                <Typography className={classes.score}> {row.visiting.score}</Typography>
                <Grid className={classes.gridLogo} sx={{ marginRight: '8%' }}>
                  <img src={smartLogoVisiting} style={{ height: 23, width: 23 }}></img>

                  <Typography className={classes.teamName}>{row.visiting.name}</Typography>
                </Grid>
              </ListItem>
            );
          })}
        </List>
      </TableContainer>
    </Paper>
  );
};
