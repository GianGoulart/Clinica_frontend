import React, { useReducer } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import AppContext from './AppContext';
import AppReducer from './AppReducer';
import Snackbar from './components/snackbar/Snackbar';

const appContext = {
    keycloak: null,
    pacientes: [],
    medicos: [],
    paciente:{},
    medico:{},
    procedimentos:[],
    procedimento:{},
    snackBar: {}
}

const App = () => {
  const routing = useRoutes(routes);
  const [state, dispatch] = useReducer(AppReducer, appContext)

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{state, dispatch}}>
        <GlobalStyles />
        <Snackbar
            color={state.snackBar.color}
            message={state.snackBar.message}
            open={state.snackBar.open}
        />
        {routing}
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
