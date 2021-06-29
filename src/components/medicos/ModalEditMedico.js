import React, { useState, useContext, useEffect } from "react";
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

import { MedicoService } from '../../services/Services'
import AppContext from '../../AppContext';
import ModalAddMedicoStyle from "./ModalAddMedicoStyle"
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

const ModalEditMedico = ({ classes, open, onClose, onChange, medico}) => {
    const {  handleSubmit } = useForm();
    const [loading, setLoading] = useState(false)
    const { state, dispatch } = useContext(AppContext)


    const onSubmit = async (e) => {
        e.preventDefault();     
        try {
            setLoading(true)
                const response = await MedicoService.updateMedico(medico)
                dispatch({
                    type: 'SET_SNACKBAR',
                    payload: {
                    message: 'Medico alterado com sucesso.'
                    },
                })
        } catch (error) {
            console.error(error)
            dispatch({
                type: 'SET_SNACKBAR',
                payload: {
                message: 'Erro ao cadastrar médico, tente novamente.',
                color: 'error'
                },
            })
        } finally {
            const response = await MedicoService.getMedicos()
            dispatch({
                type: 'SET_MEDICOS',
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
            <DialogTitle className={classes.dialogTitle}>Alterar Médico</DialogTitle>               
              <form className={classes.form} noValidate onSubmit={(e)=>handleSubmit(onSubmit(e))}>
                    <DialogContent className={classes.dialogContent}>
                        <>
                            <MaskedInput
                                value={medico.nome}
                                name="nome"
                                mask={""}
                                alwaysShowMask
                                onChange={e => onChange(e)}
                                maskChar={null}
                            >
                                <Input label={"Nome"} placeholder={"Nome do Médico"}/>
                            </MaskedInput>
                            <MaskedInput
                                value={medico.especialidade}
                                name="especialidade"
                                mask=""
                                alwaysShowMask
                                onChange={e => onChange(e)}
                                maskChar={null}
                            >   
                                <Input label={"Especialiadade"} placeholder={'Especialiadade'}/>
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

export default withStyles(ModalAddMedicoStyle)(ModalEditMedico);