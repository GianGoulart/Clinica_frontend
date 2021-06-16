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

const planoContas = [
    {value: 1, label: "01.01.01 - Receitas Consultório"},
    {value: 2, label: "01.01.02 - Receitas Hospital"},
    {value: 3, label: "01.01.03 - Receitas Materiais"},
    {value: 4, label: "01.02.01 - Ajuste Conciliação de Receitas"},
    {value: 5, label: "01.02.02 - Faturamento Terceiros"},
    {value: 6, label: "01.02.03 - Receitas Taxas de Cirurgia"},
    {value: 7, label: "01.01.03 - Alugueis de Sala"},
    {value: 8, label: "01.01.03 - Outras Receitas"},
  ]
  
  const contas = [
    {value: 1, label : "_Terceiros"},
    {value: 2, label : "Din Caixa"},
    {value: 3, label : "Din Cofre"},
    {value: 4, label : "BB Clinica"},
    {value: 5, label : "BB Nucleo"},
    {value: 6, label : "Safra Cartões"},
  ]

  
const ModalEditFinanceiro = ({ open, onClose, onChange, comercial_list, financeiro}) => {
    const {  handleSubmit } = useForm();
    const [loading, setLoading] = useState(false)
    const { state, dispatch } = useContext(AppContext)
    const classes = useStyles()

    const onSubmit = async (e) => {
        e.preventDefault();     
        try {
            setLoading(true)
            financeiro.data_pagamento = new Date(financeiro.data_pagamento).getTime()
            financeiro.data_compensacao = new Date(financeiro.data_compensacao).getTime()
            financeiro.conta = financeiro.conta != null ? parseInt(financeiro.conta) : 0
            financeiro.plano_contas = financeiro.plano_contas != null ? parseInt(financeiro.plano_contas) : 0
            financeiro.valor_ajuste = parseFloat(financeiro.valor_ajuste)
            financeiro.valor_liquido = parseFloat(financeiro.valor_liquido)

            const response = await FinanceiroService.updateFinanceiro(financeiro)
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
            {console.log(financeiro)&&<DialogTitle className={classes.dialogTitle}>Alterar</DialogTitle>}               
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
                                                onChange={e => onChange(e)}
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
                                                onChange={e => onChange(e)}
                                                native
                                                value={financeiro.plano_contas}
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
                                                onChange={e => onChange(e)}
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
                                                onChange={e => onChange(e)}
                                                fullWidth
                                                id="date"
                                                label="Data de Pagamento"
                                                name="data_pagamento"
                                                value={moment(financeiro.data_pagamento * 1000).format("YYYY-MM-DD")}
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
                                                onChange={e => onChange(e)}
                                                fullWidth
                                                id="date"
                                                label="Data de Compensação"
                                                name="data_compensacao"
                                                value={moment(financeiro.data_compensacao * 1000).format("YYYY-MM-DD")}
                                                type="date"
                                                className={classes.textField}
                                                    InputLabelProps={{
                                                shrink: true,
                                                }}
                                            />       
                                        </FormControl>
                                    </Grid> 
                                    <Grid item xs={2} className={classes.field}>
                                    <TextField
                                            label="Valor Ajuste"
                                            variant="outlined"
                                            name="valor_ajuste"
                                            value={financeiro.valor_ajuste}
                                            onChange={e => onChange(e)}                                
                                            fullWidth
                                            />
                                    </Grid>                            
                                    <Grid item xs={2} className={classes.field}>
                                        <FormControl fullWidth variant="outlined" className={classes.field}>
                                            <TextField
                                                label="Valor Liquido"
                                                variant="outlined"
                                                name="valor_liquido"
                                                value={financeiro.valor_liquido}
                                                onChange={e => onChange(e)}                                
                                                fullWidth
                                            />
                                        </FormControl>
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

export default withStyles(ModalAddFinanceiroStyle)(ModalEditFinanceiro);