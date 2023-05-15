import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Chip, Grid } from '@mui/material';
import image from '../../prueba.jpg';
import { FC } from 'react';
import { blue } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

export const CardTournament: FC<any> = ({ tournamentType, title, description }) => {
  const navigate = useNavigate();
  const handleTournament = () => {
    navigate(`/${tournamentType}`);
  };

  return (
    <Grid item>
      <Card sx={{ maxWidth: 345, backgroundColor: 'black', display: 'flex' }} elevation={24}>
        <CardActionArea onClick={handleTournament}>
          <CardMedia component="img" height="140" width="auto" src={image} />
          <CardContent>
            <Grid container flexDirection="row" display="flex">
              <Typography gutterBottom variant="h5" component="div" color="white" paddingRight={1}>
                {title}
              </Typography>
              <Chip
                variant="outlined"
                label={tournamentType}
                style={{
                  color: tournamentType === 'clasificacion' ? 'orange' : blue[400],
                  border:
                    tournamentType === 'clasificacion' ? '1px solid orange' : `1px solid ${blue[400]}`,
                }}
              />
            </Grid>
            <Typography variant="body2" color="white">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
