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
import { AcompanhamentoService } from '../../services/Services'
import ModalAddAcompanhamento from "./ModalAddAcompanhamento";
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

const AcompanhamentoListToolbar = ({props, procedimentos, medicos, tipoPgto}) => {
  const {state, dispatch } = useContext(AppContext)
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [acompanhamento, setAcompanhamento] = useState({})  
  const classes = useStyles();
  
  const handleOnchange = (e) => {
    setAcompanhamento(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
  }))}

  const handleOpenModalAdd = () => {
      setOpenModalAdd(true)
  }
 
  const handleCloseModalAdd = () => {
    setOpenModalAdd(false)
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await AcompanhamentoService.getAcompanhamentoByAnything(acompanhamento)
      dispatch({
        type: 'SET_ACOMPANHAMENTOS',
        payload: response.data == null?{}:response.data,
      })              
    } catch (error) {
      setAcompanhamento({})
      dispatch({
            type: 'SET_SNACKBAR',
            payload: {
            message: 'Erro ao buscar os acompanhamentos, tente novamente.',
            color: 'error'
            },
        })
    } finally {
      setAcompanhamento({})
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
     {
      state.user.roles == 'admin' &&  <Button
        color="primary"
        variant="contained"
        onClick={handleOpenModalAdd}
      >
        Add Acompanhamento
      </Button>}
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
    <ModalAddAcompanhamento 
      open={openModalAdd} 
      onClose={handleCloseModalAdd} 
      procedimentos={procedimentos}      
    />
  </Box>)
};

export default AcompanhamentoListToolbar;
