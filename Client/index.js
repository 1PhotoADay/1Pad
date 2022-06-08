import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import { CssBaseline } from '@mui/material/';

const theme = createTheme({
  palette: {
    background: {
      default: '#8EA1AC',
    },
    primary: {
      main: '#FBF9F9',
    },
    secondary: {
      main: green[500],
    },
    pale: {
      main: '#FCF4D9',
      contrastText: '#383838',
    },
  },
});

render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.querySelector('#root')
);
