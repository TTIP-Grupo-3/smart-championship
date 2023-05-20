import { Grid } from '@mui/material';
import { FC } from 'react';

interface MatchTeamCardProps {
  color: string;
  amount?: number;
  absolute?: boolean;
  width?: number | string;
  height?: number | string;
}

export const MatchTeamCard: FC<MatchTeamCardProps> = ({
  color,
  amount = 0,
  absolute = false,
  width = 12,
  height = 16,
}) => (
  <>
    <Grid
      data-testid="MatchTeamCard"
      style={{
        position: absolute ? 'absolute' : 'relative',
        display: amount > 0 ? 'flex' : 'none',
        width: width,
        height: height,
        backgroundColor: color,
        borderRadius: 2,
        marginInline: '1px',
      }}
    />
    {amount <= 0 && <div style={{ height: 16 }} />}
  </>
);
