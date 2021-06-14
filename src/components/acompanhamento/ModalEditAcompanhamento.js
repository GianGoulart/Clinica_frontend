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
    Select,
    Grid,
    Paper,
    InputLabel,
    Box,
    makeStyles,
    FormControl
} from "@material-ui/core";
import { AcompanhamentoService } from '../../services/Services'
import AppContext from '../../AppContext';
import ModalAddAcompanhamentoStyle from "./ModalAddAcompanhamentoStyle"
import { useForm } from "react-hook-form";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      textAlign: 'center',
      color: theme.palette.text.secondary,
      justifyContent: 'flex-end'
  
    },
    field: {
      padding: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
}));

const Input = props => {
    const {classes, name, label, placeholder, type,inputRef, value, maskChar, ...inputProps } = props;
    return  <TextField
                {...inputProps}
                ref={inputRef}
                label={label}
                id={name}
                name={name}
                value={value}
                type={type}
                fullWidth
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            /> 
  
};

const ModalEditAcompanhamento = ({ open, onClose, onChange, procedimentos, acompanhamento}) => {
    const {  handleSubmit } = useForm();
    const [loading, setLoading] = useState(false)
    const { state, dispatch } = useContext(AppContext)
    const classes = useStyles()

    const onSubmit = async (e) => {
        e.preventDefault();     
        try {
            setLoading(true)
            acompanhamento.envio_protocolo = new Date(acompanhamento.envio_protocolo).getTime() 
            acompanhamento.solicitacao_previa = new Date(acompanhamento.solicitacao_previa).getTime() 
            acompanhamento.confirmacao_solicitacao = new Date(acompanhamento.confirmacao_solicitacao).getTime()
            acompanhamento.finalizacao_previa = new Date(acompanhamento.finalizacao_previa).getTime()
            acompanhamento.status_previa =  parseInt(acompanhamento.status_previa)
            acompanhamento.envio_convenio = new Date(acompanhamento.envio_convenio).getTime() 
            acompanhamento.liberacao = new Date(acompanhamento.liberacao).getTime() 
            acompanhamento.repasse_paciente = new Date (acompanhamento.repasse_paciente).getTime() 
            acompanhamento.repasse_clinica = new Date (acompanhamento.repasse_clinica).getTime() 
            acompanhamento.status_reembolso = parseInt(acompanhamento.status_reembolso)
            
            const response = await AcompanhamentoService.updateAcompanhamento(acompanhamento)
            dispatch({
                type: 'SET_SNACKBAR',
                payload: {
                message: 'Alterado com sucesso.'
                },
            })
        } catch (error) {
            console.error(error)
            dispatch({
                type: 'SET_SNACKBAR',
                payload: {
                message: 'Erro ao cadastrar, tente novamente.',
                color: 'error'
                },
            })
        } finally {
            const response = await AcompanhamentoService.getAcompanhamento()
            dispatch({
                type: 'SET_ACOMPANHAMENTOS',
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
            <DialogTitle className={classes.dialogTitle}>Alterar Acompanhamento</DialogTitle>               
              <form className={classes.form} noValidate onSubmit={(e)=>handleSubmit(onSubmit(e))}>
                    <DialogContent className={classes.dialogContent}>
                    <Grid item xs={12}>
                            <Paper >
                                <Box
                                className={classes.field}
                                sx={{
                                    display: 'flex',
                                }}
                                >
                                    <Grid item xs={6} className={classes.field}>
                                        <FormControl fullWidth variant="outlined" className={classes.field}>
                                            <InputLabel htmlFor="outlined-age-native-simple">Selecione o Procedimento</InputLabel>
                                            <Select
                                                onChange={e => onChange(e)}
                                                native
                                                value={acompanhamento.id_procedimento}
                                                label="Selecione o Procedimento"
                                                name="id_procedimento"
                                            >
                                                <option aria-label="Selecione" value=""> </option> 
                                                {procedimentos.map((item, index) => (
                                                    <option key={index} value={item.id}>
                                                        {item.nome_medico} - {item.nome_paciente} - {item.nome_procedimento} - {moment(item.data * 1000).format("DD/MM/YYYY")}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid> 
                                    <Grid item xs={2} className={classes.field}>
                                        <Input type={"date"} name={"envio_protocolo"}  
                                            onChange={e => onChange(e)}
                                            label={"Envio Protocolo"} 
                                            value={acompanhamento.envio_protocolo>0?moment(acompanhamento.envio_protocolo * 1000).format("YYYY-MM-DD"):""}
                                            classes={classes}
                                        />
                                    </Grid>                                 
                                    <Grid item xs={2} className={classes.field}>
                                        <Input type={"date"} name={"solicitacao_previa"}  
                                            onChange={e => onChange(e)}
                                            label={"Solicitação Prévia"}
                                            value={acompanhamento.solicitacao_previa>0?moment(acompanhamento.solicitacao_previa * 1000).format("YYYY-MM-DD"):""}
                                            classes={classes}
                                        />
                                    </Grid>                                 
                                    <Grid item xs={2} className={classes.field}>
                                        <Input type={"date"} name={"confirmacao_solicitacao"}  
                                            onChange={e => onChange(e)}
                                            label={"Confirmação Solicitação"}
                                            value={acompanhamento.confirmacao_solicitacao>0?moment(acompanhamento.confirmacao_solicitacao * 1000).format("YYYY-MM-DD"):""}
                                            classes={classes}
                                        />
                                    </Grid>                                 
                                </Box>
                                <Box
                                className={classes.field}
                                sx={{
                                    display: 'flex',
                                }}
                                >                                   
                                    <Grid item xs={2} className={classes.field}>
                                        <Input type={"date"} name={"finalizacao_previa"}  
                                            onChange={e => onChange(e)}
                                            label={"Finalização Previa"}
                                            value={acompanhamento.finalizacao_previa> 0 ?moment(acompanhamento.finalizacao_previa * 1000).format("YYYY-MM-DD"):""}
                                            classes={classes}
                                        />
                                    </Grid>                                 
                                    <Grid item xs={2} className={classes.field}>
                                        <Input type={"date"} name={"envio_convenio"}  
                                            onChange={e => onChange(e)}
                                            label={"Envio Convenio"}
                                            value={acompanhamento.envio_convenio > 0 ? moment(acompanhamento.envio_convenio * 1000).format("YYYY-MM-DD"):""}
                                            classes={classes}
                                        />
                                    </Grid>                                 
                                    <Grid item xs={2} className={classes.field}>
                                        <Input type={"date"} name={"liberacao"}  
                                            onChange={e => onChange(e)}
                                            label={"Liberação"}
                                            value={acompanhamento.liberacao>0?moment(acompanhamento.liberacao * 1000).format("YYYY-MM-DD"):""}
                                            classes={classes}
                                        />
                                    </Grid>                                 
                                    <Grid item xs={2} className={classes.field}>
                                        <Input type={"date"} name={"repasse_paciente"}  
                                            onChange={e => onChange(e)}
                                            label={"Repasse Paciente"}
                                            value={acompanhamento.repasse_paciente>0?moment(acompanhamento.repasse_paciente * 1000).format("YYYY-MM-DD"):""}
                                            classes={classes}
                                        />
                                    </Grid>                                 
                                    <Grid item xs={2} className={classes.field}>
                                        <Input type={"date"} name={"repasse_clinica"}  
                                            onChange={e => onChange(e)}
                                            label={"Repasse Clinica"}
                                            value={acompanhamento.repasse_clinica>0?moment(acompanhamento.repasse_clinica * 1000).format("YYYY-MM-DD"):""}
                                            classes={classes}
                                        />
                                    </Grid>                                 
                                </Box>
                            </Paper>
                        </Grid>
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

export default withStyles(ModalAddAcompanhamentoStyle)(ModalEditAcompanhamento);