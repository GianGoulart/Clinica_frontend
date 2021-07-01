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
    const { classes, name, label, placeholder, type,inputRef, value, maskChar, ...inputProps } = props;
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

const ModalAddAcompanhamento = ({ open, onClose, procedimentos}) => {
    const {  handleSubmit } = useForm();
    const [loading, setLoading] = useState(false)
    const { state, dispatch } = useContext(AppContext)
    const [acompanhamento, setAcompanhamento] = useState({})
    const classes = useStyles()

    const handleOnchange = (e) => {
        setAcompanhamento(prevState => ({
          ...prevState,
          [e.target.name]:e.target.value
        }));
    }

    const handleOnclose = (e) =>{
        setAcompanhamento({})
        onClose()
    }

    
    const onSubmit = async (e) => {
        e.preventDefault();     
        try {
            setLoading(true)

            acompanhamento.envio_protocolo = acompanhamento.envio_protocolo != "" && acompanhamento.envio_protocolo != null ? moment(acompanhamento.envio_protocolo).utc().unix() : 0
            acompanhamento.solicitacao_previa = acompanhamento.solicitacao_previa != "" && acompanhamento.solicitacao_previa != null ? moment(acompanhamento.solicitacao_previa).utc().unix() : 0
            acompanhamento.confirmacao_solicitacao = acompanhamento.confirmacao_solicitacao != "" && acompanhamento.confirmacao_solicitacao != null ? moment(acompanhamento.confirmacao_solicitacao).utc().unix() : 0
            acompanhamento.finalizacao_previa = acompanhamento.finalizacao_previa != "" && acompanhamento.finalizacao_previa != null ? moment(acompanhamento.finalizacao_previa).utc().unix() : 0
            acompanhamento.status_previa =  acompanhamento.status_previa != null ? parseInt(acompanhamento.status_previa) : 0
            acompanhamento.envio_convenio = acompanhamento.envio_convenio != "" && acompanhamento.envio_convenio != null ? moment(acompanhamento.envio_convenio).utc().unix() : 0
            acompanhamento.liberacao = acompanhamento.liberacao != "" && acompanhamento.liberacao != null ? moment(acompanhamento.liberacao).utc().unix() : 0
            acompanhamento.repasse_paciente = acompanhamento.repasse_paciente != "" && acompanhamento.repasse_paciente != null ? moment(acompanhamento.repasse_paciente).utc().unix() : 0
            acompanhamento.repasse_clinica = acompanhamento.repasse_clinica != "" && acompanhamento.repasse_clinica != null ? moment(acompanhamento.repasse_clinica).utc().unix() : 0
            acompanhamento.status_reembolso = acompanhamento.status_reembolso != null ? parseInt(acompanhamento.status_reembolso) : 0

            const response = await AcompanhamentoService.saveAcompanhamento(acompanhamento)
            dispatch({
                type: 'SET_SNACKBAR',
                payload: {
                message: 'Cadastrado com sucesso.'
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
            setAcompanhamento({})
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
            onClose={handleOnclose}
            maxWidth="lg"
            fullWidth
        >  
            <DialogTitle className={classes.dialogTitle}>Cadastrar Acompanhamento</DialogTitle>               
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
                                                onChange={e => handleOnchange(e)}
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
                                            onChange={e => handleOnchange(e)}
                                            label={'Envio Protocolo'}
                                            value={acompanhamento.envio_protocolo}
                                            classes={classes}
                                        />
                                    </Grid>                                 
                                    <Grid item xs={2} className={classes.field}>
                                        <Input type={"date"} name={"solicitacao_previa"}  
                                            onChange={e => handleOnchange(e)}
                                            label={"Solicitação Prévia"} 
                                            value={acompanhamento.solicitacao_previa}                                            
                                            classes={classes}
                                        />
                                    </Grid>                                 
                                    <Grid item xs={2} className={classes.field}>
                                        <Input type={"date"} name={"confirmacao_solicitacao"}  
                                            onChange={e => handleOnchange(e)}
                                            label={"Confirmação Solicitação"}
                                            value={acompanhamento.confirmacao_solicitacao>0?acompanhamento.confirmacao_solicitacao:""}                                            
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
                                            onChange={e => handleOnchange(e)}
                                            label={"Finalização Previa"}
                                            value={acompanhamento.finalizacao_previa>0?acompanhamento.finalizacao_previa:""}
                                            classes={classes}
                                        />
                                    </Grid>                                 
                                    <Grid item xs={2} className={classes.field}>
                                        <Input type={"date"} name={"envio_convenio"}  
                                            onChange={e => handleOnchange(e)}
                                            label={"Envio Convenio"}
                                            value={acompanhamento.envio_convenio>0?acompanhamento.envio_convenio:""}
                                            classes={classes}
                                        />
                                    </Grid>                                 
                                    <Grid item xs={2} className={classes.field}>
                                        <Input type={"date"} name={"liberacao"}  
                                            onChange={e => handleOnchange(e)}
                                            label={"Liberação"}
                                            value={acompanhamento.liberacao>0?acompanhamento.liberacao:""}
                                            classes={classes}
                                        />
                                    </Grid>                                 
                                    <Grid item xs={2} className={classes.field}>
                                        <Input type={"date"} name={"repasse_paciente"}  
                                            onChange={e => handleOnchange(e)}
                                            label={"Repasse Paciente"}
                                            value={acompanhamento.repasse_paciente>0?acompanhamento.repasse_paciente:""}
                                            classes={classes}
                                        />
                                    </Grid>                                 
                                    <Grid item xs={2} className={classes.field}>
                                        <Input type={"date"} name={"repasse_clinica"}  
                                            onChange={e => handleOnchange(e)}
                                            label={"Repasse Clinica"}
                                            value={acompanhamento.repasse_clinica>0?acompanhamento.repasse_clinica:""}
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

export default withStyles(ModalAddAcompanhamentoStyle)(ModalAddAcompanhamento);