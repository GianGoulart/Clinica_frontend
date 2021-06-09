import React from 'react';

const AppContext = React.createContext({
    keycloak: null,
    pacientes: [],
    medicos: [],
    paciente:{},
    medico:{},
    procedimentos:[],
    procedimento:{},
  
    snackBar: {}
});

export default AppContext;
