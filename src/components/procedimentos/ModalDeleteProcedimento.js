import React, { useState, useContext } from "react";
import {
    withStyles,
    Dialog,
    DialogTitle,
    DialogActions,
    CircularProgress,
    Button
} from "@material-ui/core";

import { ProcedimentoService } from '../../services/Services'
import AppContext from '../../AppContext';
import ModalAddProcedimentoStyle from "./ModalAddProcedimentoStyle"
import { useForm } from "react-hook-form";


const ModalDeleteProcedimento = ({ classes, open, onClose, id }) => {
    const {  handleSubmit } = useForm();
    const [loading, setLoading] = useState(false)
    const { dispatch } = useContext(AppContext)

    const onSubmit = async (e) => {

        e.preventDefault();        
        try {
            setLoading(true)
            const response = await ProcedimentoService.delProcedimento(id)
            dispatch({
                type: 'SET_SNACKBAR',
                payload: {
                message: 'Procedimento excluído com sucesso.'
                },
            })
        } catch (error) {
            console.error(error)
            dispatch({
                type: 'SET_SNACKBAR',
                payload: {
                message: 'Erro ao excluir procedimento, tente novamente.',
                color: 'error'
                },
            })
        } finally {
            const response = await ProcedimentoService.getProcedimentos()
            dispatch({
                type: 'SET_PROCEDIMENTOS',
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

export default withStyles(ModalAddProcedimentoStyle)(ModalDeleteProcedimento);