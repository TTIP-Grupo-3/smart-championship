import { Grid } from '@mui/material';
import { FC } from 'react';

interface MatchTeamCardProps {
  color: string;
  amount: number;
}

export const MatchTeamCard: FC<MatchTeamCardProps> = ({ color, amount }) => (
  <>
    <Grid
      data-testid="MatchTeamCard"
      style={{
        display: amount > 0 ? 'flex' : 'none',
        width: 12,
        height: 16,
        backgroundColor: color,
        borderRadius: 2,
        marginInline: '1px',
      }}
    />
    {amount <= 0 && <div style={{ height: 16 }} />}
  </>
);
