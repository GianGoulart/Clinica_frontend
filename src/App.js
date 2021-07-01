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
    producao_list:[],
    comercial_list:[],
    comercial:{},
    acompanhamentos:[],
    acompanhamento:{},
    tipoPagto : [
      {value: 1, label: "Reembolso"},
      {value: 2, label: "Extra"},
      {value: 3, label: "Particular"},
    ],      
    planoContas : [
        {value: 1, label: "01.01.01 - Receitas Consultório"},
        {value: 2, label: "01.01.02 - Receitas Hospital"},
        {value: 3, label: "01.01.03 - Receitas Materiais"},
        {value: 4, label: "01.02.01 - Ajuste Conciliação de Receitas"},
        {value: 5, label: "01.02.02 - Faturamento Terceiros"},
        {value: 6, label: "01.02.03 - Receitas Taxas de Cirurgia"},
        {value: 7, label: "01.01.03 - Alugueis de Sala"},
        {value: 8, label: "01.01.03 - Outras Receitas"},
      ],      
    contas : [
        {value: 1, label : "_Terceiros"},
        {value: 2, label : "Din Caixa"},
        {value: 3, label : "Din Cofre"},
        {value: 4, label : "BB Clinica"},
        {value: 5, label : "BB Nucleo"},
        {value: 6, label : "Safra Cartões"},
      ],
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
            open={state.snackBar.open}
        />
        {routing}
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
