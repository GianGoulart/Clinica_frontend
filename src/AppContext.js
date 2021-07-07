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
    snackBar: {},
    acompanhamento:{},
    user:{},
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
      ]
      
});

export default AppContext;
