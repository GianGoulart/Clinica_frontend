const AppReducer = (state, action) => {
    switch (action.type) {
        case "SET_PACIENTES":
            return {
                ...state,
                pacientes: action.payload == null ? [] : action.payload,
            }
        case "SET_MEDICOS":
            return {
                ...state,
                medicos: action.payload == null ? [] : action.payload,
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
                procedimentos: action.payload == null ? [] : action.payload,
        }
        case "SET_COMERCIAL_LIST":
            return {
                ...state,
                comercial_list: action.payload == null ? [] : action.payload,
        }
        case "SET_PRODUCAO_LIST":
            return {
                ...state,
                producao_list: action.payload == null ? [] : action.payload,
        }
        case "SET_COMERCIAL":
            return {
                ...state,
                comercial: action.payload,
        }
        case "SET_ACOMPANHAMENTOS":
            return {
                ...state,
                acompanhamentos: action.payload == null ? [] : action.payload,
        }
        case "SET_ACOMPANHAMENTO":
            return {
                ...state,
                acompanhamento: action.payload,
        }
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
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