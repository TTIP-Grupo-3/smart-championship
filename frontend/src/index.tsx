import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { theme } from './theme';

import reportWebVitals from './reportWebVitals';
import { esES, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
        dateAdapter={AdapterDayjs}
      >
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
