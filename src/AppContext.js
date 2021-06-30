import React from 'react';

const AppContext = React.createContext({
    keycloak: null,
    pacientes: [],
    paciente:{},
    medicos: [],
    medico:{},
    procedimentos:[],
    procedimento:{},
    comercial_list:[],
    comercial:{},
    producao_list:[],
    comercial:{},
    acompanhamentos:[],
    acompanhamento:{},
    snackBar: {}
});

export default AppContext;
