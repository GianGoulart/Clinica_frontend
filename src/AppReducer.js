const AppReducer = (state, action) => {
    switch (action.type) {
        case "SET_KEYCLOAK":
            return {
                ...state,
                keycloak: action.payload,
            }
        case "SET_PACIENTES":
            return {
                ...state,
                pacientes: action.payload,
            }
        case "SET_MEDICOS":
            return {
                ...state,
                medicos: action.payload,
            }
        case "SET_PACIENTE":
            return {
                ...state,
                paciente: action.payload,
            }
        case "SET_MEDICO":
            return {
                ...state,
                medico: action.payload,
            }
        case "SET_PROCEDIMENTOS":
            return {
                ...state,
                procedimentos: action.payload,
            }
        case "DELETE_PACIENTE":
        let pacientes = [...state.pacientes];
        const indexOf = pacientes.findIndex(item => item.Id === action.payload);            
        pacientes.splice(indexOf, 1);            
        return {
            ...state,
            pacientes
        }
        case "SET_SNACKBAR":
            return {
                ...state,
                snackBar: {
                    ...action.payload,
                    open: true,
                },
            }
        case "HIDE_SNACKBAR":
            return {
                ...state,
                snackBar: {
                    ...state.snackBar,
                    open: false
                },
            }
        default:
            return state;
    }
};

export default AppReducer;