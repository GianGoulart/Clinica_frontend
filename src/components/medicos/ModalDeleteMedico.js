import React, { useState, useContext } from "react";
import {
    withStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    Button
} from "@material-ui/core";

import { MedicoService } from '../../services/Services'
import AppContext from '../../AppContext';
import ModalAddMedicoStyle from "./ModalAddMedicoStyle"
import { useForm } from "react-hook-form";


const ModalDeleteMedico = ({ classes, open, onClose, id }) => {
    const { register, handleSubmit, errors } = useForm();
    const [loading, setLoading] = useState(false)
    const { state, dispatch } = useContext(AppContext)

    const onSubmit = async (e) => {

        e.preventDefault();        
        try {
            setLoading(true)
            const response = await MedicoService.delMedico(id)
            dispatch({
                type: 'SET_SNACKBAR',
                payload: {
                message: 'Medico excluído com sucesso.'
                },
            })
        } catch (error) {
            console.error(error)
            dispatch({
                type: 'SET_SNACKBAR',
                payload: {
                message: 'Erro ao excluir médico, tente novamente.',
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
            maxWidth="xs"
            fullWidth
        >   
            <DialogTitle className={classes.dialogTitle}>Deseja realmente excluir?</DialogTitle>                
                <form className={classes.form} noValidate onSubmit={(e)=>handleSubmit(onSubmit(e))}>
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
                            {loading ? <CircularProgress color='secondary' size={25} /> : 'Excluir'}
                        </Button>
                    </DialogActions>
                </form>
        </Dialog>
    );
};

export default withStyles(ModalAddMedicoStyle)(ModalDeleteMedico);