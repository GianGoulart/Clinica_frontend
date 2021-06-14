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
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import { FinanceiroService } from '../../services/Services'
import AppContext from '../../AppContext';
import ModalAddFinanceiroStyle from "./ModalAddFinanceiroStyle"
import MaskedInput from "react-input-mask";
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

const ModalAddFinanceiro = ({ open, onClose, comercial_list, planoContas, contas, financeiroProps}) => {
    const {  handleSubmit } = useForm();
    const [loading, setLoading] = useState(false)
    const { state, dispatch } = useContext(AppContext)
    const [financeiro, setFinanceiro] = useState(financeiroProps)
    const classes = useStyles()

    const handleOnchage = (e) =>{
        setFinanceiro(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();     
        try {
            setLoading(true)
            financeiro.data_pagamento = financeiro.data_pagamento != "" && financeiro.data_pagamento != null ? moment(financeiro.data_pagamento).utc().unix() : 0
            financeiro.data_compensacao = financeiro.data_compensacao != "" && financeiro.data_compensacao != null ? moment(financeiro.data_compensacao).utc().unix() : 0
            financeiro.conta = financeiro.conta != null ? parseInt(financeiro.conta) : 0
            financeiro.plano_contas = financeiro.plano_contas != null ? parseInt(financeiro.plano_contas) : 0
            financeiro.valor_ajuste = parseFloat(financeiro.valor_ajuste)
            financeiro.valor_liquido = parseFloat(financeiro.valor_liquido)

            const response = await FinanceiroService.saveFinanceiro(financeiro)
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
            setFinanceiro({})
            const response = await FinanceiroService.getFinanceiro()
            dispatch({
                type: 'SET_FINANCEIRO_LIST',
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
            <DialogTitle className={classes.dialogTitle}>Cadastrar</DialogTitle>               
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
                                            <InputLabel htmlFor="outlined-age-native-simple">Selecione o Registro</InputLabel>
                                            <Select
                                                onChange={e => handleOnchage(e)}                                
                                                native
                                                value={financeiro.id_comercial}
                                                label="Selecione"
                                                name="id_comercial"
                                            >
                                                <option aria-label="Selecione" value=""> </option> 
                                                {comercial_list.map((item, index) => (
                                                    <option key={index} value={item.id}>
                                                        {item.desc_procedimento} - {item.nome_medico_part}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid> 
                                    <Grid item xs={4} className={classes.field}>
                                        <FormControl fullWidth variant="outlined" className={classes.field}>
                                            <InputLabel htmlFor="outlined-age-native-simple">Plano de Contas</InputLabel>
                                            <Select
                                                onChange={e => handleOnchage(e)}                                
                                                native
                                                value={financeiro.planoContas}
                                                label="Plano de Contas"
                                                name="plano_contas"
                                            >
                                                <option aria-label="Selecione" value="" />
                                                {planoContas.map((item, index) => (
                                                    <option key={index} value={item.value}>
                                                        {item.label}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid> 
                                    <Grid item xs={2} className={classes.field}>
                                        <FormControl fullWidth variant="outlined" className={classes.field}>
                                            <InputLabel htmlFor="outlined-age-native-simple">Contas</InputLabel>
                                            <Select
                                                onChange={e => handleOnchage(e)}                                
                                                native
                                                value={financeiro.conta}
                                                name="conta"
                                                label="Contas"
                                            >
                                                <option aria-label="Selecione" value="" />
                                                {contas.map((item, index) => (
                                                    <option key={index} value={item.value}>
                                                        {item.label}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid> 
                                                             
                                </Box>
                                <Box
                                className={classes.field}
                                sx={{
                                    display: 'flex',
                                }}
                                >                                   
                                    <Grid item xs={4}  className={classes.field}>
                                        <FormControl fullWidth variant="outlined" className={classes.field}>
                                            <TextField
                                                onChange={e => handleOnchage(e)}                                
                                                fullWidth
                                                id="date"
                                                label="Data de Pagamento"
                                                name="data_pagamento"
                                                value={financeiro.data_pagamento}
                                                type="date"
                                                className={classes.textField}
                                                    InputLabelProps={{
                                                shrink: true,
                                                }}
                                            />       
                                        </FormControl>
                                    </Grid>  
                                    <Grid item xs={4} className={classes.field}>
                                        <FormControl fullWidth variant="outlined" className={classes.field}>
                                            <TextField
                                                onChange={e => handleOnchage(e)}                                
                                                fullWidth
                                                id="date"
                                                label="Data de Compensação"
                                                name="data_compensacao"
                                                value={financeiro.data_compensacao}
                                                type="date"
                                                className={classes.textField}
                                                    InputLabelProps={{
                                                shrink: true,
                                                }}
                                            />       
                                        </FormControl>
                                    </Grid> 
                                    <Grid item xs={2} className={classes.field}>
                                        <CurrencyTextField
                                            label="Valor Ajuste"
                                            variant="outlined"
                                            name="valor_ajuste"
                                            value={financeiro.valor_ajuste}
                                            currencySymbol="R$"
                                            decimalCharacter=","
                                            digitGroupSeparator="."
                                            onChange={e => handleOnchage(e)}                                
                                        />
                                    </Grid>                            
                                    <Grid item xs={2} className={classes.field}>
                                        <CurrencyTextField
                                            label="Valor Liquido"
                                            variant="outlined"
                                            name="valor_liquido"
                                            value={financeiro.valor_liquido}
                                            currencySymbol="R$"
                                            decimalCharacter=","
                                            digitGroupSeparator="."
                                            onChange={e => handleOnchage(e)}                                
                                        />
                                    </Grid>                            
                                </Box>
                                <Box
                                    className={classes.field}
                                    sx={{
                                        display: 'flex',
                                    }}
                                    >
                                    <Grid item xs={12} className={classes.field}>
                                        <FormControl fullWidth variant="outlined" className={classes.field}>
                                            <TextField
                                                margin="dense"
                                                label={"Observação"}
                                                name={"obs"}
                                                value={financeiro.obs}
                                                placeholder={"Observação"}
                                                type="text"
                                                fullWidth
                                            />                                         
                                        </FormControl>
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

export default withStyles(ModalAddFinanceiroStyle)(ModalAddFinanceiro);