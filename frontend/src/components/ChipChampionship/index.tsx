import { Chip, ChipProps } from '@mui/material';
import { blue } from '@mui/material/colors';
import { FC } from 'react';
import { TypeChampionship } from '../../interfaces';
import { types } from '../CardTournament';

interface ChipChampionshipProps extends ChipProps {
  type: TypeChampionship;
}

export const ChipChampionship: FC<ChipChampionshipProps> = ({ type, ...props }) => {
  return (
    <Chip
      variant="outlined"
      label={types[type]}
      style={{
        color: type === 'score' ? 'orange' : blue[400],
        border: type === 'score' ? '1px solid orange' : `1px solid ${blue[400]}`,
      }}
      {...props}
    />
  );
};
