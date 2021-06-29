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
import AppContext from '../../AppContext';
import { ComercialService } from '../../services/Services'
import ModalAddComercial from "./ModalAddComercial";
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


const ComercialListToolbar = ({props, procedimentos, medicos}) => {
  const {state, dispatch } = useContext(AppContext)
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [comercial, setComercial] = useState({})  
  const classes = useStyles();
  
  const handleOpenModalAdd = () => {
      setOpenModalAdd(true)
  }
 
  const handleCloseModalAdd = () => {
    setOpenModalAdd(false)
  }

  const handleOnchange = (e) => {
    setComercial(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
  }))}

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      comercial.data_emissao_nf = comercial.data_emissao_nf != "" && comercial.data_emissao_nf != null ? moment(comercial.data_emissao_nf).utc().unix() : 0
      comercial.data_vencimento = comercial.data_vencimento != "" && comercial.data_vencimento != null?moment(comercial.data_vencimento).utc().unix():0
      comercial.tipo_pagamento = comercial.tipo_pagamento != null ? parseInt(comercial.tipo_pagamento) : 0

      setLoading(true)
      const response = await ComercialService.getComercialByAnything(comercial)
      dispatch({
        type: 'SET_COMERCIAL_LIST',
        payload: response.data == null?{}:response.data,
      })              
    } catch (error) {
      setComercial({})
      dispatch({
            type: 'SET_SNACKBAR',
            payload: {
            message: 'Erro ao buscar os dados comerciais, tente novamente.',
            color: 'error'
            },
        })
    } finally {
        setComercial({})
        setLoading(false)
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
        Add Comercial
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
          <Grid item xs={2} className={classes.field}>
            <FormControl fullWidth variant="outlined" className={classes.field}>
                <InputLabel htmlFor="outlined-age-native-simple">Tipo Pagto</InputLabel>
                <Select
                    onChange={e => handleOnchange(e)}
                    native
                    value={comercial.tipo_pagamento}
                    label="Selecione"
                    name="tipo_pagamento"
                >
                    <option aria-label="Selecione" value=""> </option> 
                    {tipoPagto.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.label}
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
                    label="Data de Emissão NF"
                    name="data_emissao_nf"
                    value={comercial.data_emissao_nf}
                    type="date"
                    className={classes.textField}
                        InputLabelProps={{
                    shrink: true,
                    }}
              /> 
            </FormControl>                
          </Grid> 
          <Grid item xs={2} className={classes.field}>
            <FormControl fullWidth variant="outlined" className={classes.field}>
              <TextField
                    onChange={e => handleOnchange(e)}
                    fullWidth
                    id="date"
                    label="Data de Vencimento"
                    name="data_vencimento"
                    value={comercial.data_vencimento}
                    type="date"
                    className={classes.textField}
                        InputLabelProps={{
                    shrink: true,
                    }}
              /> 
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
    <ModalAddComercial 
      open={openModalAdd} 
      onClose={handleCloseModalAdd} 
      procedimentos={procedimentos}
      medicos={medicos}
      comercialProps={{}}
      planoContas={planoContas}
      contas={contas}
    />
  </Box>)
};

export default ComercialListToolbar;
