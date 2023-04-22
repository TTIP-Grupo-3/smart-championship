import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FC } from 'react';
import { Grid } from '@mui/material';

export const SimpleAccordion: FC<any> = ({ text }) => {
  return (
    <div>
      <Accordion style={{ backgroundColor: 'white', borderRadius: '0px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{text}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: 'white', display: 'flex' }}>
          <Grid container>
            {' '}
            <Grid item xs={6} style={{ borderRight: '2px solid black' }}>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                amet blandit leo lobortis eget.
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                amet blandit leo lobortis eget.
              </Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
