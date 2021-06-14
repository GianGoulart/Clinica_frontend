import React, { useState, useContext } from "react";

import {
  Box,
  Button,
  Grid,
  Paper,
  makeStyles,
  InputLabel,
  FormControl,
  Select,
  TextField
} from '@material-ui/core';
import ModalAddFinanceiro from './ModalAddFinanceiro';
import AppContext from '../../AppContext';
import { FinanceiroService } from '../../services/Services'

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

const FinanceiroListToolbar = ({props, comercial_list}) => {
  const {state, dispatch } = useContext(AppContext)
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [financeiro, setFinanceiro] = useState({})  
  const classes = useStyles();
  
  const handleOpenModalAdd = () => {
      setOpenModalAdd(true)
  }
 
  const handleCloseModalAdd = () => {
    setOpenModalAdd(false)
  }

  const handleOnchange = (e) => {
    setFinanceiro(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
  }))}

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      financeiro.data_pagamento = financeiro.data_pagamento != "" && financeiro.data_pagamento != null ? moment(financeiro.data_pagamento).utc().unix() : 0
      financeiro.conta = financeiro.conta != null ? parseInt(financeiro.conta) : 0
      financeiro.plano_contas = financeiro.plano_contas != null ? parseInt(financeiro.plano_contas) : 0
      
      setLoading(true)
      const response = await FinanceiroService.getFinanceiroByAnything(financeiro)
      dispatch({
        type: 'SET_FINANCEIRO_LIST',
        payload: response.data == null?{}:response.data,
      })              
    } catch (error) {
        dispatch({
            type: 'SET_SNACKBAR',
            payload: {
            message: 'Erro ao buscar os registros, tente novamente.',
            color: 'error'
            },
        })
        setFinanceiro({})
    } finally {
        setLoading(false)
        setFinanceiro({})
    }      
  };

  return(
  <Box {...props}>
    <Box
      className={classes.paper}
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Button
        color="primary"
        variant="contained"
        onClick={handleOpenModalAdd}
      >
        Add Registro
      </Button>
    </Box>
    <Grid item xs={12}>
      <Paper >
        <Box
          className={classes.field}
          sx={{
            display: 'flex',
          }}
        >
          <Grid item xs={5} className={classes.field}>
            <FormControl fullWidth variant="outlined" className={classes.field}>
                <InputLabel htmlFor="outlined-age-native-simple">Registro Comercial</InputLabel>
                <Select
                    onChange={e => handleOnchange(e)}
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
          <Grid item xs={2} className={classes.field}>
            <FormControl fullWidth variant="outlined" className={classes.field}>
                <TextField
                    onChange={e => handleOnchange(e)}
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
          <Grid item xs={3} className={classes.field}>
            <FormControl fullWidth variant="outlined" className={classes.field}>
                <InputLabel htmlFor="outlined-age-native-simple">Selecione o Plano Contas</InputLabel>
                <Select
                    onChange={e => handleOnchange(e)}
                    native
                    value={financeiro.plano_contas}
                    label="Plano Contas"
                    name="plano_contas"
                >
                    <option aria-label="Selecione" value=""> </option> 
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
                <InputLabel htmlFor="outlined-age-native-simple">Selecione a Conta</InputLabel>
                <Select
                    onChange={e => handleOnchange(e)}
                    native
                    value={financeiro.conta}
                    label="Selecione a Conta"
                    name="conta"
                >
                    <option aria-label="Selecione" value=""> </option> 
                    {contas.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </Select>
            </FormControl>                
          </Grid> 
          <Grid item xs={2}  className={classes.paper}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={onSubmit}
            >
              Buscar
            </Button>
          </Grid>
        </Box>
      </Paper>
    </Grid>
    <ModalAddFinanceiro 
      open={openModalAdd} 
      onClose={handleCloseModalAdd} 
      comercial_list={comercial_list}
      financeiroProps={{}}
      planoContas={planoContas}
      contas={contas}
    />
  </Box>)
};

export default FinanceiroListToolbar;
