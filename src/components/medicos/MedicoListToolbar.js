import React, { useState, useContext } from "react";

import {
  Box,
  Button,
  TextField,
  Grid,
  Paper,
  makeStyles
} from '@material-ui/core';
import MaskedInput from "react-input-mask";
import ModalAddMedico from './ModalAddMedico';
import AppContext from '../../AppContext';
import { MedicoService } from '../../services/Services'

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

const MedicoListToolbar = (props) => {
  const { state, dispatch } = useContext(AppContext)
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [medico, setMedico] = useState({nome:"",especialidade:""})  
  const classes = useStyles();
  
  const searches = [
    {
      name:"nome",
      label:"Nome do Médico",
      value: medico.nome,
      mask:"",
    },
    {
      name:"especialidade",
      label:"Especialidade do Médico",
      value: medico.especialidade,
      mask:""
    }
  ]
  const handleOpenModalAdd = () => {
      setOpenModalAdd(true)
  }
 
  const handleCloseModalAdd = () => {
    setOpenModalAdd(false)
  }

  const handleOnchange = (e) => {
    setMedico(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
  }))}

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoading(true)
        const response = await MedicoService.getMedicosByAnything(medico)
        dispatch({
          type: 'SET_MEDICOS',
          payload: response.data == null?{}:response.data,
        })              
    } catch (error) {
        dispatch({
            type: 'SET_SNACKBAR',
            payload: {
            message: 'Erro ao buscar médico, tente novamente.',
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
      state.user.roles == 'admin' && <Button
        color="primary"
        variant="contained"
        onClick={handleOpenModalAdd}
      >
        Add Médico
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
    <ModalAddMedico 
      open={openModalAdd} 
      onClose={handleCloseModalAdd} 
      medicoProps={{nome:"",especialidade:""}}
    />
  </Box>)
};

export default MedicoListToolbar;
