import { createTheme, Theme } from '@mui/material/styles';
import { Color } from '@mui/material';

export type ColorPartial = Partial<Color>;
declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    blue?: ColorPartial;
    orange?: ColorPartial;
    surface?: PaletteColorOptions;
  }

  interface Palette {
    blue: Color;
    orange: Color;
    surface: PaletteColor;
  }
}

export const theme: Theme = createTheme({
  palette: {
    blue: {
      200: '#00BCD4',
    },
    orange: {
      200: '#ED7D31',
      300: '#bf360c',
    },
    background: {
      paper: '#282c34',
    },
  },
});
