import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, withStyles } from '@material-ui/core';
import PacienteListResults from '../../components/pacientes/PacienteListResults';
import PacienteListToolbar from '../../components/pacientes/PacienteListToolbar';
import AppContext from 'src/AppContext';
import Loading from 'src/components/loading/Loading';
import { PacienteService } from 'src/services/Services';
import ModalEditPaciente from 'src/components/pacientes/ModalEditPaciente';
import ModalDeletePaciente from 'src/components/pacientes/ModalDeletePaciente';

const Paciente = () => {
   const [loading, setLoading] = useState(false)
   const { state, dispatch } = useContext(AppContext)
   const [openEdit, setOpenEdit] = useState({open:false})
   const [openDelete, setOpenDelete] = useState({open:false})
   const [paciente, setPaciente] = useState({})

   useEffect(() => {
      (async () => {
        try {
          setLoading(true)
          const response = await PacienteService.getPacientes();
          dispatch({
            type: 'SET_PACIENTES',
            payload: response.data,
          })              
        } catch (error) {
          setLoading(false)
          dispatch({
            type: 'SET_SNACKBAR',
            payload: {
                message: 'Erro ao buscar os pacientes cadastradas.',
                color: 'error'
            },
          })          
        } finally {
          setLoading(false)
        }
      })();
  },[]);

  const handleCloseModalDelete = () => setOpenDelete(false)
  const handleOpenModalDelete = (id) => setOpenDelete({open:true,id})
  const handleOpenModalEdit = (paciente) =>{
      setPaciente(paciente)
      setOpenEdit({open:true})
  }
  const handleCloseModalEdit = () => {
      setPaciente({})
      setOpenEdit(false)
  }    

  const handleOnchageEdit = (e) =>{
      setPaciente(prevState => ({
          ...prevState,
          [e.target.name]: e.target.value
      }))
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
            <PacienteListToolbar />
            {loading
            ?(
                <Box sx={{ pt: 3 }}>
                    <Loading />
                </Box>
            ):(
                <Box sx={{ pt: 3 }}>
                  {state.pacientes.length > 0 
                  ?(<PacienteListResults pacientes={state.pacientes} openHandleEdit={handleOpenModalEdit} openHandleDelete={handleOpenModalDelete} paciente={paciente}/>)
                  :null}
                </Box>
           )}
          <ModalEditPaciente open={openEdit.open} onClose={handleCloseModalEdit} onChange={handleOnchageEdit} paciente={paciente}/>
          <ModalDeletePaciente open={openDelete.open} onClose={handleCloseModalDelete} id={openDelete.id} />
        </Container>
      </Box>
    </>
  );
};

export default withStyles()(Paciente);
