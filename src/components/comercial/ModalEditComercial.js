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
    FormControl,
    FormHelperText
} from "@material-ui/core";
import { ComercialService, DashboardService } from '../../services/Services'
import AppContext from '../../AppContext';
import ModalAddComercialStyle from "./ModalAddComercialStyle"
import { useForm } from "react-hook-form";
import moment from "moment";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import formatMoney from 'accounting-js/lib/formatMoney.js'
import unformat from 'accounting-js/lib/unformat.js'

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
    { value: 1, label: "Reembolso" },
    { value: 2, label: "Extra" },
    { value: 3, label: "Particular" },
]

const formaPagto = [
    { value: 1, label: "Reembolso" },
    { value: 2, label: "Dinheiro" },
    { value: 3, label: "Transferencia" },
    { value: 4, label: "Boleto" },
    { value: 5, label: "Cheque" },
    { value: 6, label: "Débito" },
    { value: 7, label: "Crédito a Vista" },
    { value: 8, label: "Crédito Parcelado" },
]

const funcoes = [
    { value: 1, label: "CP" },
    { value: 2, label: "AN" },
    { value: 3, label: "IN" },
    { value: 4, label: "1AX" },
    { value: 5, label: "2AX" },
]

const planoContas = [
    { value: 1, label: "01.01.01 - Receitas Consultório" },
    { value: 2, label: "01.01.02 - Receitas Hospital" },
    { value: 3, label: "01.01.03 - Receitas Materiais" },
    { value: 4, label: "01.02.01 - Ajuste Conciliação de Receitas" },
    { value: 5, label: "01.02.02 - Faturamento Terceiros" },
    { value: 6, label: "01.02.03 - Receitas Taxas de Cirurgia" },
    { value: 7, label: "01.01.03 - Alugueis de Sala" },
    { value: 8, label: "01.01.03 - Outras Receitas" },
]

const contas = [
    { value: 1, label: "_Terceiros" },
    { value: 2, label: "Din Caixa" },
    { value: 3, label: "Din Cofre" },
    { value: 4, label: "BB Clinica" },
    { value: 5, label: "BB Nucleo" },
    { value: 6, label: "Safra Cartões" },
]


const Input = props => {
    const { name, label, placeholder, type, inputRef, value, maskChar, ...inputProps } = props;
    return <TextField
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

const ModalEditComercial = ({ open, onClose, medicos, procedimentos, comercialEdit }) => {
    const { handleSubmit } = useForm();
    const [loading, setLoading] = useState(false)
    const { state, dispatch } = useContext(AppContext)
    const [comercial, setComercial] = useState({ comercialEdit })
    const [procedimento, setProcedimento] = useState({})
    const classes = useStyles()

    useEffect(() => {
        if (comercialEdit.length > 0 ){
            comercialEdit.map((comercial)=>{
                comercial.valor_parcelas = formatMoney(comercial.valor_parcelas, { symbol: "R$", precision: 2, thousand: ".", decimal: "," })
                comercial.valor_ajuste = formatMoney(comercial.valor_ajuste, { symbol: "R$", precision: 2, thousand: ".", decimal: "," })
                    

                if (comercial.id_procedimento != undefined && comercial.id_procedimento != "" && comercial.id_procedimento != null) {
                    const p = procedimentos
                        .filter(procedimento => procedimento.id == comercial.id_procedimento) // inline
                        .map(p => p);
                    setProcedimento(p[0])
        
                }
            })

        }

        setComercial(comercialEdit)
    }, [comercialEdit])


    const onChange = (e, key) => {

        var aux = comercial[key]

        aux[e.target.name] = e.target.name == "data_emissao_nf" || e.target.name == "data_vencimento" || e.target.name == "data_pagamento" || e.target.name == "data_compensacao" ? moment(e.target.value).utc().unix() : e.target.value

        // comercial[key] = aux
        
        // setComercial(comercial)

        setComercial(comercial=>({
            ...comercial,
            [key]: aux
        }))
         
        if (e.target.name == "id_procedimento") {
            const p = procedimentos
                .filter(procedimento => procedimento.id == e.target.value) // inline
                .map(p => p);

            setProcedimento(p[0])
        }
    }


    const onSubmit = async (e, key) => {
        e.preventDefault();
        try {
            setLoading(true)
            comercial[key].data_emissao_nf = new Date(comercial[key].data_emissao_nf).getTime()
            comercial[key].data_vencimento = new Date(comercial[key].data_vencimento).getTime()
            comercial[key].funcao_medico_part = parseInt(comercial[key].funcao_medico_part)
            comercial[key].tipo_pagamento = parseInt(comercial[key].tipo_pagamento)
            comercial[key].forma_pagamento = parseInt(comercial[key].forma_pagamento)
            comercial[key].qtd_parcelas = parseInt(comercial[key].qtd_parcelas)
            comercial[key].data_pagamento = new Date(comercial[key].data_pagamento).getTime()
            comercial[key].data_compensacao = new Date(comercial[key].data_compensacao).getTime()
            comercial[key].conta = comercial[key].conta != null ? parseInt(comercial[key].conta) : 0
            comercial[key].plano_contas = comercial[key].plano_contas != null ? parseInt(comercial[key].plano_contas) : 0

            comercial[key].valor_ajuste = unformat(comercial[key].valor_ajuste,",")
            comercial[key].valor_parcelas = unformat(comercial[key].valor_parcelas,",")

            const response = await ComercialService.updateComercial(comercial[key])
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

            const producao = await DashboardService.getDashboard()
            dispatch({
                type: 'SET_PRODUCAO_LIST',
                payload: producao.data,
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
        >{comercialEdit.length > 0 && 
            comercialEdit.map((comercial, key)=>(
                <>
                    <DialogTitle className={classes.dialogTitle}>Alterar Comercial</DialogTitle>
                    <form className={classes.form} noValidate onSubmit={(e) => handleSubmit(onSubmit(e))}>
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
                                                {procedimentos.length > 0 ?
                                                    <Select
                                                        onChange={e => onChange(e,key)}
                                                        native
                                                        value={comercialEdit[key].id_procedimento}
                                                        label="Selecione o Procedimento"
                                                        name="id_procedimento"
                                                    >
                                                        <option aria-label="Selecione" value=""> </option>
                                                        {procedimentos.map((item, index) => (
                                                            <option key={index} value={item.id}>
                                                                {item.nome_medico} - {item.nome_paciente} - {item.nome_procedimento} - {moment(item.data * 1000).format("DD/MM/YYYY")}
                                                            </option>
                                                        ))}
                                                    </Select> :
                                                    null
        
                                                }
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={4} className={classes.field}>
                                            <FormControl fullWidth variant="outlined" className={classes.field}>
                                                <InputLabel htmlFor="outlined-age-native-simple">Médico Participante</InputLabel>
                                                {medicos.length > 0 ?
                                                    <Select
                                                        onChange={e => onChange(e, key)}
                                                        native
                                                        value={comercialEdit[key].id_medico_part}
                                                        label="Médico"
                                                        name="id_medico_part"
                                                    >
                                                        <option aria-label="Selecione" value="" />
                                                        {medicos.map((item, index) => (
                                                            <option key={index} value={item.id}>
                                                                {item.nome}
                                                            </option>
                                                        ))}
                                                    </Select> :
                                                    null
                                                }
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2} className={classes.field}>
                                            <FormControl fullWidth variant="outlined" className={classes.field}>
                                                <InputLabel htmlFor="outlined-age-native-simple">Função Médico</InputLabel>
                                                <Select
                                                    onChange={e => onChange(e, key)}
                                                    native
                                                    value={comercialEdit[key].funcao_medico_part}
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
                                        <Grid item xs={3} className={classes.field}>
                                            <FormControl fullWidth variant="outlined" className={classes.field}>
                                                <InputLabel htmlFor="outlined-age-native-simple">Tipo de Pagamento</InputLabel>
                                                <Select
                                                    onChange={e => onChange(e, key)}
                                                    native
                                                    value={comercialEdit[key].tipo_pagamento}
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
                                        <Grid item xs={3} className={classes.field}>
                                            <FormControl fullWidth variant="outlined" className={classes.field}>
                                                <InputLabel htmlFor="outlined-age-native-simple">Forma de Pagamento</InputLabel>
                                                <Select
                                                    onChange={e => onChange(e, key)}
                                                    native
                                                    value={comercialEdit[key].forma_pagamento}
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
                                        <Grid item xs={4} className={classes.field}>
                                            <FormControl fullWidth variant="outlined" className={classes.field}>
                                                <InputLabel htmlFor="outlined-age-native-simple">Plano de Contas</InputLabel>
                                                <Select
                                                    onChange={e => onChange(e, key)}
                                                    native
                                                    value={comercialEdit[key].plano_contas}
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
                                                    onChange={e => onChange(e, key)}
                                                    native
                                                    value={comercialEdit[key].conta}
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
                                        <Grid item xs={3} className={classes.field}>
                                            <Input type={"date"} name={"data_emissao_nf"}
                                                onChange={e => onChange(e, key)}
                                                label={"Data Emissao NF"}
                                                value={comercialEdit[key].data_emissao_nf>0?moment(comercialEdit[key].data_emissao_nf * 1000).format("YYYY-MM-DD"):""}
        
                                            />
                                        </Grid>
                                        <Grid item xs={3} className={classes.field}>
                                            <Input type={"date"} name={"data_vencimento"}
                                                onChange={e => onChange(e, key)}
                                                value={comercialEdit[key].data_vencimento>0?moment(comercialEdit[key].data_vencimento * 1000).format("YYYY-MM-DD"):""}
                                                label={"Data Vencimento"}
                                            />
                                        </Grid>
                                        <Grid item xs={3} className={classes.field}>
                                            <Input type={"date"} name={"data_pagamento"}
                                                onChange={e => onChange(e, key)}
                                                value={comercialEdit[key].data_pagamento>0?moment(comercialEdit[key].data_pagamento * 1000).format("YYYY-MM-DD"):""}
                                                label={"Data Pagamento"}
                                            />
                                        </Grid>
                                        <Grid item xs={3} className={classes.field}>
                                            <Input type={"date"} name={"data_compensacao"}
                                                onChange={e => onChange(e, key)}
                                                value={comercialEdit[key].data_compensacao>0?moment(comercialEdit[key].data_compensacao * 1000).format("YYYY-MM-DD"):""}
                                                label={"Data Compensação"} 
                                            />
                                        </Grid>
        
                                    </Box>
                                    <Box
                                        className={classes.field}
                                        sx={{
                                            display: 'flex',
                                        }}
                                    >
                                        <Grid item xs={3} className={classes.field}>
                                            <FormControl fullWidth variant="outlined" disabled className={classes.field}>
                                                <FormHelperText id="my-helper-text">Valor Procedimento</FormHelperText>
        
                                                <Input type={"text"} name={"valor"} value={procedimento.valor}
                                                    placeholder={'Valor Procedimento'}
                                                />
        
                                            </FormControl>
        
                                        </Grid>
                                        <Grid item xs={3} className={classes.field}>
                                            <FormControl fullWidth variant="outlined" className={classes.field}>
                                                <FormHelperText id="my-helper-text">Qtd de Parcelas </FormHelperText>
                                                <Input type={"number"} name={"qtd_parcelas"} value={comercialEdit[key].qtd_parcelas}
                                                    placeholder={'Qtde Parcelas'}
                                                    onChange={e => onChange(e, key)}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3} className={classes.field}>
                                            <FormControl fullWidth variant="outlined" className={classes.field}>
                                                <FormHelperText id="my-helper-text">Valor Parcela</FormHelperText>
                                                <CurrencyInput placeholder="R$0,00" onChange={(e)=>onChange(e, key)} type="text" name={"valor_parcelas"} value={comercialEdit[key].valor_parcelas}/>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3} className={classes.field}>
                                            <FormControl fullWidth variant="outlined" className={classes.field}>
                                                <FormHelperText id="my-helper-text">Valor Ajuste</FormHelperText>
                                                <CurrencyInput placeholder="R$0,00" onChange={(e)=>onChange(e, key)} type="text" name={"valor_ajuste"} value={comercialEdit[key].valor_ajuste}/>
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
                                                    value={comercialEdit[key].obs}
                                                    placeholder={"Observação"}
                                                    type="text"
                                                    onChange={e => onChange(e, key)}
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
                                onClick={e => onSubmit(e, key)}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress color='secondary' size={25} /> : 'Cadastrar'}
                            </Button>
                        </DialogActions>
                    </form>
                </>                                    
            ))
        }
        </Dialog>
    );
};

export default withStyles(ModalAddComercialStyle)(ModalEditComercial);