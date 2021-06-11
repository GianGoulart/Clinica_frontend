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
    paciente:{},
    medicos: [],
    medico:{},
    procedimentos:[],
    procedimento:{},
    snackBar: {},
    financeiro_list:[],
    financeiro:{},
    comercial_list:[],
    comercial:{},
    status : [
      {value: 1, label: "A Agendar"},
	    {value: 2, label:"Agendado"},
	    {value: 3, label: "Realizado"},
	    {value: 4, label: "Cancelado"},
    ]
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
        />
        {routing}
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
