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

const ComercialListToolbar = ({props, procedimentos, medicos, tipoPgto}) => {
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
          <Grid item xs={4} className={classes.field}>
            <FormControl fullWidth variant="outlined" className={classes.field}>
                <InputLabel htmlFor="outlined-age-native-simple">Selecione o Procedimento</InputLabel>
                <Select
                    onChange={e => handleOnchange(e)}
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
                name={"data_emissao_nf"}
                value={comercial.data_emissao_nf}
                placeholder={"Data Emissão NF"}
                type={"date"}
                fullWidth
              /> 
            </FormControl>                
          </Grid> 
          <Grid item xs={2} className={classes.field}>
            <FormControl fullWidth variant="outlined" className={classes.field}>
              <TextField
                onChange={e => handleOnchange(e)}
                name={"data_vencimento"}
                value={comercial.data_vencimento}
                placeholder={"Data Vencimento"}
                type={"date"}
                fullWidth
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
      comercialProps={{id: "",id_procedimento: "",nome_paciente: "",nome_medico: "",id_medico_part: "",funcao_medico_part: 0,qtd_parcelas: 0,valor_parcelas: 0,tipo_pagamento: 0,forma_pagamento: 0,data_emissao_nf: 0,data_vencimento: 0}}
    />
  </Box>)
};

export default ComercialListToolbar;
