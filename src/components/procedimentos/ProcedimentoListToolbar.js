import React, { useState, useContext, useEffect } from "react";

import {
  Box,
  Button,
  Grid,
  Paper,
  makeStyles,
  InputLabel,
  FormControl,
  Select
} from '@material-ui/core';
import ModalAddProcedimento from './ModalAddProcedimento';
import AppContext from '../../AppContext';
import { ProcedimentoService } from '../../services/Services'

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

const status = [
  {value: 1, label: "A Agendar"},
  {value: 2, label:"Agendado"},
  {value: 3, label: "Realizado"},
  {value: 4, label: "Cancelado"},
]

const procedimentos_select = [
  {value: 1, label : "CONSULTA"},
  {value: 2, label : "EXAMES"},
  {value: 3, label : "CIRURGIA"},
  {value: 4, label : "RETORNO"},
  {value: 5, label : "ESCLERO"},
  {value: 6, label : "CURATIVO"},
  {value: 7, label : "COMBOS"},
  {value: 8, label : "VENDAS DE PRODUTOS"},
  {value: 9, label : "TAXAS E LOCAÇÃO"},
]

const ProcedimentoListToolbar = ({props, pacientes, medicos}) => {
  const {state, dispatch } = useContext(AppContext)
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [procedimento, setProcedimento] = useState({})  
  const classes = useStyles();
  const [user, setUser] = useState({});

  useEffect(()=>{
    setUser(JSON.parse(window.sessionStorage.getItem("user")))

  },[])

  const handleOpenModalAdd = () => {
      setOpenModalAdd(true)
  }
 
  const handleCloseModalAdd = () => {
    setOpenModalAdd(false)
  }

  const handleOnchange = (e) => {
    setProcedimento(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
  }))}

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      procedimento.esteira = procedimento.esteira != ""?parseInt(procedimento.esteira):0
      procedimento.status = procedimento.status != ""?parseInt(procedimento.status):0
      procedimento.procedimento = procedimento.procedimento != ""?parseInt(procedimento.procedimento):0
      
      setLoading(true)
      const response = await ProcedimentoService.getProcedimentosByAnything(procedimento)
      dispatch({
        type: 'SET_PROCEDIMENTOS',
        payload: response.data == null?{}:response.data,
      })              
    } catch (error) {
        dispatch({
            type: 'SET_SNACKBAR',
            payload: {
            message: 'Erro ao buscar o procedimento, tente novamente.',
            color: 'error'
            },
        })
    } finally {
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
      user.roles == 'admin' &&
      <Button
        color="primary"
        variant="contained"
        onClick={handleOpenModalAdd}
      >
        Add Procedimento
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
          <Grid item xs={3} className={classes.field}>
            <FormControl fullWidth variant="outlined" className={classes.field}>
                <InputLabel htmlFor="outlined-age-native-simple">Selecione o Paciente</InputLabel>
                <Select
                    onChange={e => handleOnchange(e)}
                    native
                    value={procedimento.id_paciente}
                    label="Selecione o Paciente"
                    name="id_paciente"
                >
                    <option aria-label="Selecione" value=""> </option> 
                    {pacientes.map((item, index) => (
                        <option key={index} value={item.id}>
                            {item.nome}
                        </option>
                    ))}
                </Select>
            </FormControl>                
          </Grid> 
          <Grid item xs={3} className={classes.field}>
            <FormControl fullWidth variant="outlined" className={classes.field}>
                <InputLabel htmlFor="outlined-age-native-simple">Selecione o Médico</InputLabel>
                <Select
                    onChange={e => handleOnchange(e)}
                    native
                    value={procedimento.id_medico}
                    label="Selecione o Médico"
                    name="id_medico"
                >
                    <option aria-label="Selecione" value=""> </option> 
                    {medicos.map((item, index) => (
                        <option key={index} value={item.id}>
                            {item.nome}
                        </option>
                    ))}
                </Select>
            </FormControl>                
          </Grid> 
          <Grid item xs={3} className={classes.field}>
            <FormControl fullWidth variant="outlined" className={classes.field}>
                <InputLabel htmlFor="outlined-age-native-simple">Selecione o Procedimento</InputLabel>
                <Select
                    onChange={e => handleOnchange(e)}
                    native
                    value={procedimento.procedimento}
                    label="Selecione o Procedimento"
                    name="procedimento"
                >
                    <option aria-label="Selecione" value=""> </option> 
                    {procedimentos_select.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </Select>
            </FormControl>                
          </Grid> 
          <Grid item xs={3} className={classes.field}>
            <FormControl fullWidth variant="outlined" className={classes.field}>
                <InputLabel htmlFor="outlined-age-native-simple">Selecione o Status</InputLabel>
                <Select
                    onChange={e => handleOnchange(e)}
                    native
                    value={procedimento.status}
                    label="Selecione o Status"
                    name="status"
                >
                    <option aria-label="Selecione" value=""> </option> 
                    {status.map((item, index) => (
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
    <ModalAddProcedimento 
      open={openModalAdd} 
      onClose={handleCloseModalAdd} 
      pacientes={pacientes}
      medicos={medicos}
      procedimentoProps={{procedimento:"",id_medico:"",id_paciente:"",data:"",esteira:"",valor:"",status:"",local:"",desc_procedimento:"",local_procedimento:""}}
    />
  </Box>)
};

export default ProcedimentoListToolbar;
