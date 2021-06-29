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
    Select,
    Grid,
    Paper,
    InputLabel,
    Box,
    makeStyles,
    FormControl
} from "@material-ui/core";
import CurrencyFormat from 'react-currency-format';
import { ComercialService } from '../../services/Services'
import AppContext from '../../AppContext';
import ModalAddComercialStyle from "./ModalAddComercialStyle"
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

const tipoPagto = [
    {value: 1, label: "Reembolso"},
    {value: 2, label: "Extra"},
    {value: 3, label: "Particular"},
]

const formaPagto = [
	{value: 1, label : "Reembolso"},
	{value: 2, label : "Dinheiro"},
	{value: 3, label : "Transferencia"},
	{value: 4, label : "Boleto"},
	{value: 5, label : "Cheque"},
	{value: 6, label : "Débito"},
	{value: 7, label : "Crédito a Vista"},
	{value: 8, label : "Crédito Parcelado"},
]

const funcoes = [
	{value: 1, label: "CP"},
	{value: 2, label: "AN"},
	{value: 3, label: "IN"},
	{value: 4, label: "1AX"},
	{value: 5, label: "2AX"},
]

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


const Input = props => {
    const { name, label, placeholder, type,inputRef, value, maskChar, ...inputProps } = props;
    return  <TextField
                {...inputProps}
                ref={inputRef}
                label={label}
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
                type={type}
                fullWidth
            /> 
  
};

const ModalEditComercial = ({ open, onClose, medicos, procedimentos, comercialEdit}) => {
    const {  handleSubmit } = useForm();
    const [loading, setLoading] = useState(false)
    const { state, dispatch } = useContext(AppContext)
    const [comercial, setComercial] = useState({comercialEdit})
    const classes = useStyles()

    useEffect(()=>{
        setComercial(comercialEdit)
    },[comercialEdit])

    const onChange = (e) =>{

        setComercial(prevState => ({
            ...prevState,
            [e.target.name]:e.target.name == "data_emissao_nf" || e.target.name == "data_vencimento" || e.target.name == "data_pagamento" || e.target.name == "data_compensacao" ? moment(e.target.value).utc().unix():e.target.value
        }))
        console.log(e.target.name, e.target.value)
    }


    const onSubmit = async (e) => {
        e.preventDefault();     
        try {
            setLoading(true)
            comercial.data_emissao_nf = new Date(comercial.data_emissao_nf).getTime()
            comercial.data_vencimento = new Date(comercial.data_vencimento).getTime()
            comercial.funcao_medico_part = parseInt(comercial.funcao_medico_part)
            comercial.tipo_pagamento = parseInt(comercial.tipo_pagamento)
            comercial.forma_pagamento = parseInt(comercial.forma_pagamento)
            comercial.qtd_parcelas = parseInt(comercial.qtd_parcelas)
            comercial.valor_parcelas = parseFloat(comercial.valor_parcelas)
            comercial.data_pagamento = new Date(comercial.data_pagamento).getTime()
            comercial.data_compensacao = new Date(comercial.data_compensacao).getTime()
            comercial.conta = comercial.conta != null ? parseInt(comercial.conta) : 0
            comercial.plano_contas = comercial.plano_contas != null ? parseInt(comercial.plano_contas) : 0
            comercial.valor_ajuste = parseFloat(comercial.valor_ajuste)
            comercial.valor_liquido = parseFloat(comercial.valor_liquido)

            console.log(comercial)
            const response = await ComercialService.updateComercial(comercial)
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
            const response = await ComercialService.getComercial()
            dispatch({
                type: 'SET_COMERCIAL_LIST',
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
            <DialogTitle className={classes.dialogTitle}>Alterar Comercial</DialogTitle>               
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
                                                value={comercial.id_procedimento}
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
                                    <Grid item xs={4} className={classes.field}>
                                        <FormControl fullWidth variant="outlined" className={classes.field}>
                                            <InputLabel htmlFor="outlined-age-native-simple">Médico Participante</InputLabel>
                                            <Select
                                                onChange={e => onChange(e)}
                                                native
                                                value={comercial.id_medico_part}
                                                label="Médico"
                                                name="id_medico_part"
                                            >
                                                <option aria-label="Selecione" value="" />
                                                {medicos.map((item, index) => (
                                                    <option key={index} value={item.id}>
                                                        {item.nome}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid> 
                                    <Grid item xs={2} className={classes.field}>
                                        <FormControl fullWidth variant="outlined" className={classes.field}>
                                            <InputLabel htmlFor="outlined-age-native-simple">Função Médico</InputLabel>
                                            <Select
                                                onChange={e => onChange(e)}
                                                native
                                                value={comercial.funcao_medico_part}
                                                name="funcao_medico_part"
                                                label="Função"
                                            >
                                                <option aria-label="Selecione" value="" />
                                                {funcoes.map((item, index) => (
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
                                    <Grid item xs={3}  className={classes.field}>
                                        <FormControl fullWidth variant="outlined" className={classes.field}>
                                            <InputLabel htmlFor="outlined-age-native-simple">Tipo de Pagamento</InputLabel>
                                            <Select
                                                onChange={e => onChange(e)}
                                                native
                                                value={comercial.tipo_pagamento}
                                                label="Tipo de Pagamento"
                                                name="tipo_pagamento"
                                            >
                                                <option aria-label="Selecione" value="" />
                                                {tipoPagto.map((item, index) => (
                                                    <option key={index} value={item.value}>
                                                        {item.label}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>  
                                    <Grid item xs={3}  className={classes.field}>
                                        <FormControl fullWidth variant="outlined" className={classes.field}>
                                            <InputLabel htmlFor="outlined-age-native-simple">Forma de Pagamento</InputLabel>
                                            <Select
                                                onChange={e => onChange(e)}
                                                native
                                                value={comercial.forma_pagamento}
                                                label="Forma de Pagamento"
                                                name="forma_pagamento"
                                            >
                                                <option aria-label="Selecione" value="" />
                                                {formaPagto.map((item, index) => (
                                                    <option key={index} value={item.value}>
                                                        {item.label}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>  
                                    <Grid item xs={2}  className={classes.field}>
                                        <FormControl fullWidth variant="outlined" className={classes.field}>
                                            <Input type={"number"} name={"qtd_parcelas"} value={comercial.qtd_parcelas} 
                                                label={"Qtd de Parcelas"} placeholder={'Qtde Parcelas'}
                                                onChange={e => onChange(e)}
                                            />
                                        </FormControl>
                                    </Grid>  
                                    <Grid item xs={2} className={classes.field}>
                                        <FormControl fullWidth variant="outlined" className={classes.field}>
                                        {(comercial.valor_parcelas == undefined || comercial.valor_parcelas == 0) && <InputLabel htmlFor="outlined-age-native-simple">Valor Parcelas</InputLabel>}
                                            <CurrencyFormat 
                                                customInput={Input}
                                                prefix={"R$"}
                                                decimalScale={2}
                                                thousandSeparator={","}
                                                decimalSeparator={"."}
                                                thousandSpacing={'3'}
                                                allowNegative ={false}
                                                value={comercial.valor_parcelas}                                                
                                                onValueChange={(values) => { const {formattedValue, value} = values;
                                                    setComercial(prevState => ({
                                                        ...prevState,
                                                        "valor_parcelas": value
                                                    }))
                                                }}
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
                                    <Grid item xs={2} className={classes.field}>
                                        <Input type={"date"} name={"data_emissao_nf"}  
                                                onChange={e => onChange(e)}
                                                label={"Data Emissao NF"} placeholder={'Data Emissão NF'}
                                            value={moment(comercial.data_emissao_nf * 1000).format("YYYY-MM-DD")}

                                        />
                                    </Grid>                                 
                                    <Grid item xs={2} className={classes.field}>
                                        <Input type={"date"} name={"data_vencimento"} 
                                                onChange={e => onChange(e)}
                                                value={moment(comercial.data_vencimento * 1000).format("YYYY-MM-DD")}
                                            label={"Data Vencimento"} placeholder={'Data Vencimento'}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={classes.field}>
                                        <FormControl fullWidth variant="outlined" className={classes.field}>
                                            <InputLabel htmlFor="outlined-age-native-simple">Plano de Contas</InputLabel>
                                            <Select
                                                onChange={e => onChange(e)}
                                                native
                                                value={comercial.planoContas}
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
                                                onChange={e => onChange(e)}
                                                native
                                                value={comercial.conta}
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
                                            <Input type={"date"} name={"data_pagamento"} 
                                                    onChange={e => onChange(e)}
                                                    value={moment(comercial.data_pagamento * 1000).format("YYYY-MM-DD")}
                                                label={"Data Pagamento"} placeholder={'Data Pagamento'}
                                            />
                                        </FormControl>
                                    </Grid>  
                                    <Grid item xs={4} className={classes.field}>
                                        <FormControl fullWidth variant="outlined" className={classes.field}>
                                            <Input type={"date"} name={"data_compensacao"} 
                                                    onChange={e => onChange(e)}
                                                    value={moment(comercial.data_compensacao * 1000).format("YYYY-MM-DD")}
                                                label={"Data Compensação"} placeholder={'Data Compensação'}
                                            />
                                        </FormControl>
                                    </Grid> 
                                    <Grid item xs={2} className={classes.field}>
                                        <FormControl fullWidth variant="outlined" className={classes.field}>
                                            {(comercial.valor_ajuste == undefined || comercial.valor_ajuste == 0) && <InputLabel htmlFor="outlined-age-native-simple">Valor Ajuste</InputLabel>}
                                                <CurrencyFormat 
                                                    customInput={Input}
                                                    prefix={"R$"}
                                                    decimalScale={2}
                                                    thousandSeparator={","}
                                                    decimalSeparator={"."}
                                                    thousandSpacing={'3'}
                                                    allowNegative ={false}
                                                    value={comercial.valor_ajuste}                                                
                                                    onValueChange={(values) => { const {formattedValue, value} = values;
                                                        setComercial(prevState => ({
                                                            ...prevState,
                                                            "valor_ajuste": value
                                                        }))
                                                    }}
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
                                                value={comercial.obs}
                                                placeholder={"Observação"}
                                                type="text"
                                                onChange={e => onChange(e)}
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

export default withStyles(ModalAddComercialStyle)(ModalEditComercial);