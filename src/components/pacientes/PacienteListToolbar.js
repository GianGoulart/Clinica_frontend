import React, { useState, useContext, useEffect } from "react";

import {
  Box,
  Button,
  TextField,
  Grid,
  Paper,
  makeStyles
} from '@material-ui/core';
import MaskedInput from "react-input-mask";
import ModalAddPaciente from './ModalAddPaciente';
import AppHistory from '../../AppHistory';
import AppContext from '../../AppContext';
import { PacienteService } from '../../services/Services'

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

const PacienteListToolbar = (props) => {
  const { state, dispatch } = useContext(AppContext)
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [paciente, setPaciente] = useState({
      nome:"",
      cpf:"",
      convenio:""
  })
  const [user, setUser] = useState({});

  useEffect(()=>{
    setUser(JSON.parse(window.sessionStorage.getItem("user")))

  },[])

  const classes = useStyles();
  
  const searches = [
    {
      name:"nome",
      label:"Nome do Paciente",
      value: paciente.nome,
      mask:"",
    },
    {
      name:"convenio",
      label:"Nome do Convênio",
      value: paciente.convenio,
      mask:"",
    },
    {
      name:"cpf",
      label:"CPF do Paciente",
      value: paciente.cpf,
      mask:"999.999.999-99"
    }
  ]
  const handleOpenModalAdd = () => setOpenModalAdd(true)

  const handleCloseModalAdd = () => setOpenModalAdd(false)

  const handleOnchange = (e) => {
    setPaciente(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
  }))}

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoading(true)
        const response = await PacienteService.getPacientesByAnything(paciente)
        dispatch({
          type: 'SET_PACIENTES',
          payload: response.data == null?{}:response.data,
        })              
    } catch (error) {
        dispatch({
            type: 'SET_SNACKBAR',
            payload: {
            message: 'Erro ao cadastrar paciente, tente novamente.',
            color: 'error'
            },
        })
    } finally {
        AppHistory.push(`/app/pacientes`)
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
      user.roles == 'admin' &&<Button
        color="primary"
        variant="contained"
        onClick={handleOpenModalAdd}
      >
        Add Paciente
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
            {searches.map((field)=>(
              <Grid item xs={3} className={classes.field}>
                <MaskedInput
                    name={field.name}
                    value={field.value}
                    mask={field.mask}
                    alwaysShowMask
                    onChange={(e)=>handleOnchange(e)}
                    maskChar={null}
                >
                  <TextField   
                    margin="dense"
                    label={field.label}
                    id={field.name}
                    type="text"
                    fullWidth
                  />                
                </MaskedInput>                
              </Grid> 
            ))}
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
    
    <ModalAddPaciente 
      open={openModalAdd} 
      onClose={handleCloseModalAdd} 
      pacienteProps={{nome:"",cpf:"",telefone:"",telefone2:"",plano:"",acomodacao:"",convenio:""}}
    />
  </Box>)
};

export default PacienteListToolbar;
