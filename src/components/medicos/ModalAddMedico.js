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

const ModalAddMedico = ({ classes, open, onClose, medicoProps}) => {
    const {  handleSubmit } = useForm();
    const [loading, setLoading] = useState(false)
    const { state, dispatch } = useContext(AppContext)
    const [ medico, setMedico ] = useState(medicoProps)

    const handleOnchage = (e) =>{
        setMedico(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();     
        try {
            setLoading(true)
            console.log(medico)
            const response = await MedicoService.saveMedico(medico)
            dispatch({
                type: 'SET_SNACKBAR',
                payload: {
                message: 'Medico cadastado com sucesso.'
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
            setMedico({})
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
            <DialogTitle className={classes.dialogTitle}>Cadastrar Médico</DialogTitle>               
              <form className={classes.form} noValidate onSubmit={(e)=>handleSubmit(onSubmit(e))}>
                    <DialogContent className={classes.dialogContent}>
                        <>
                            <MaskedInput
                                value={medico.nome}
                                name="nome"
                                mask={""}
                                alwaysShowMask
                                onChange={e => handleOnchage(e)}
                                maskChar={null}
                            >
                                <Input label={"Nome"} placeholder={"Nome do Médico"}/>
                            </MaskedInput>
                            <MaskedInput
                                value={medico.cpf}
                                name="cpf"
                                mask="999.999.999-99"
                                alwaysShowMask
                                onChange={e => handleOnchage(e)}
                                maskChar={null}
                            >   
                                <Input label={"CPF"} placeholder={'Digite o CPF do Médico'}/>
                            </MaskedInput>
                            <MaskedInput
                                value={medico.cnpj}
                                name="cnpj"
                                mask="99.999.999/9999-99"
                                alwaysShowMask
                                onChange={e => handleOnchage(e)}
                                maskChar={null}
                            >   
                                <Input label={"CNPJ"} placeholder={'Digite o CNPJ do Médico'}/>
                            </MaskedInput>
                            <MaskedInput
                                value={medico.razao_social}
                                name="razao_social"
                                mask=""
                                alwaysShowMask
                                onChange={e => handleOnchage(e)}
                                maskChar={null}
                            >   
                                <Input label={"Razão Social"} placeholder={'Razão social do Médico'}/>
                            </MaskedInput>
                            <MaskedInput
                                value={medico.banco_pf}
                                name="banco_pf"
                                mask=""
                                alwaysShowMask
                                onChange={e => handleOnchage(e)}
                                maskChar={null}
                            >   
                                <Input label={"Banco PF"} placeholder={'Banco Pessoa Fisica'}/>
                            </MaskedInput>
                            <MaskedInput
                                value={medico.agencia_pf}
                                name="agencia_pf"
                                mask=""
                                alwaysShowMask
                                onChange={e => handleOnchage(e)}
                                maskChar={null}
                            >   
                                <Input label={"Agencia PF"} placeholder={'Agência Pessoa Fisica'}/>
                            </MaskedInput>
                            <MaskedInput
                                value={medico.conta_pf}
                                name="conta_pf"
                                mask=""
                                alwaysShowMask
                                onChange={e => handleOnchage(e)}
                                maskChar={null}
                            >   
                                <Input label={"Conta PF"} placeholder={'Conta Pessoa Fisica'}/>
                            </MaskedInput>
                            <MaskedInput
                                value={medico.banco_pj}
                                name="banco_pj"
                                mask=""
                                alwaysShowMask
                                onChange={e => handleOnchage(e)}
                                maskChar={null}
                            >   
                                <Input label={"Banco PJ"} placeholder={'Banco Pessoa Juridíca'}/>
                            </MaskedInput>
                            <MaskedInput
                                value={medico.agencia_pj}
                                name="agencia_pj"
                                mask=""
                                alwaysShowMask
                                onChange={e => handleOnchage(e)}
                                maskChar={null}
                            >   
                                <Input label={"Agencia PJ"} placeholder={'Agência Pessoa Juridíca'}/>
                            </MaskedInput>
                            <MaskedInput
                                value={medico.conta_pj}
                                name="conta_pj"
                                mask=""
                                alwaysShowMask
                                onChange={e => handleOnchage(e)}
                                maskChar={null}
                            >   
                                <Input label={"Conta PJ"} placeholder={'Conta Pessoa Juridíca'}/>
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

export default withStyles(ModalAddMedicoStyle)(ModalAddMedico);