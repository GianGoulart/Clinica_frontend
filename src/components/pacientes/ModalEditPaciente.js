import React, { useState, useContext } from "react";
import {
    withStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    Button,
    TextField,
} from "@material-ui/core";

import { PacienteService } from '../../services/Services'
import AppContext from '../../AppContext';
import ModalAddPacienteStyle from "./ModalAddPacienteStyle"
import MaskedInput from "react-input-mask";
import { useForm } from "react-hook-form";


const Input = props => {
    const { name, label, placeholder, inputRef, value, maskChar, ...inputProps } = props;
    return  <TextField
                {...inputProps}
                ref={inputRef}
                margin="dense"
                label={label}
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
                type="text"
                fullWidth
            /> 
  
};

const ModalEditPaciente = ({ classes, open, onClose, onChange, paciente}) => {
    const {  handleSubmit } = useForm();
    const [loading, setLoading] = useState(false)
    const { dispatch } = useContext(AppContext)


    const onSubmit = async (e) => {
        e.preventDefault();     
        try {
            setLoading(true)
                const response = await PacienteService.updatePaciente(paciente)
                dispatch({
                    type: 'SET_SNACKBAR',
                    payload: {
                    message: 'Paciente alterado com sucesso.'
                    },
                })
        } catch (error) {
            console.error(error)
            dispatch({
                type: 'SET_SNACKBAR',
                payload: {
                message: 'Erro ao cadastrar paciente, tente novamente.',
                color: 'error'
                },
            })
        } finally {
            const response = await PacienteService.getPacientes()
            dispatch({
                type: 'SET_PACIENTES',
                payload: response.data,
            })              
            setLoading(false)
            onClose()
        }
        
    };
    
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
        >  
            <DialogTitle className={classes.dialogTitle}>Alterar Paciente</DialogTitle>               
              <form className={classes.form} noValidate onSubmit={(e)=>handleSubmit(onSubmit(e))}>
                    <DialogContent className={classes.dialogContent}>
                        <>
                            <MaskedInput
                                value={paciente.nome}
                                name="nome"
                                mask={""}
                                alwaysShowMask
                                onChange={e => onChange(e)}
                                maskChar={null}
                            >
                                <Input label={"Nome"} placeholder={"Nome do Paciente"}/>
                            </MaskedInput>
                            <MaskedInput
                                value={paciente.cpf}
                                name="cpf"
                                mask="999.999.999-99"
                                alwaysShowMask
                                onChange={e => onChange(e)}
                                maskChar={null}
                            >   
                                <Input label={"CPF"} placeholder={'Digite o CPF do Paciente'}/>
                            </MaskedInput>
                            <MaskedInput
                                value={paciente.plano}
                                name="plano"
                                mask=""
                                alwaysShowMask
                                onChange={e => onChange(e)}
                                maskChar={null}
                            >   
                                <Input label={"Plano"} placeholder={'Qual plano do Paciente'}/>
                            </MaskedInput>
                            <MaskedInput
                                value={paciente.convenio}
                                name="convenio"
                                mask=""
                                alwaysShowMask
                                onChange={e => onChange(e)}
                                maskChar={null}
                            >   
                                <Input label={"Convênio"} placeholder={'Digite o Convenio do Paciente'}/>
                            </MaskedInput>
                            <MaskedInput
                                value={paciente.acomodacao}
                                name="acomodacao"
                                mask=""
                                alwaysShowMask
                                onChange={e => onChange(e)}
                                maskChar={null}
                            >   
                                <Input label={"Acomodação"} placeholder={'Qual a acomodação?'}/>
                            </MaskedInput>
                            <MaskedInput
                                value={paciente.telefone}
                                name="telefone"
                                mask="(99)99999-9999"
                                alwaysShowMask
                                onChange={e => onChange(e)}
                                maskChar={null}
                            >   
                                <Input label={"Telefone"} placeholder={'Digite o telefone do Paciente'}/>
                            </MaskedInput>
                            <MaskedInput
                                value={paciente.telefone2}
                                name="telefone2"
                                mask="(99)99999-9999"
                                alwaysShowMask
                                onChange={e => onChange(e)}
                                maskChar={null}
                            >   
                                <Input label={"Telefone2"} placeholder={'Digite o telefone do Paciente'}/>
                            </MaskedInput>
                        </>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            className={classes.buttonSubmit}
                            onClick={onSubmit}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress color='secondary' size={25} /> : 'Cadastrar'}
                        </Button>
                    </DialogActions>
                </form>
        </Dialog>
    );
};

export default withStyles(ModalAddPacienteStyle)(ModalEditPaciente);