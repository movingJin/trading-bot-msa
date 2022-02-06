import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from '@redux/store';
import MainRouter from '@routes/MainRouter';
import { createTheme, ThemeProvider } from '@mui/material/styles/';
import GlobalStyles from './styles/GlobalStyle';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1080,
      lg: 1480,
      xl: 1840,
    },
  },
  palette: {
    mode: 'light',
  },
});

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MainRouter />
        </ConnectedRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
