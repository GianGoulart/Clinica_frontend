import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, withStyles } from '@material-ui/core';
import MedicoListResults from '../../components/medicos/MedicoListResults';
import MedicoListToolbar from '../../components/medicos/MedicoListToolbar';
import AppContext from 'src/AppContext';
import Loading from 'src/components/loading/Loading';
import { MedicoService } from 'src/services/Services';
import ModalEditMedico from 'src/components/medicos/ModalEditMedico';
import ModalDeleteMedico from 'src/components/medicos/ModalDeleteMedico';
 
const Medico = () => {
    const [loading, setLoading] = useState(false)
    const { state, dispatch } = useContext(AppContext)
    const [openEdit, setOpenEdit] = useState({open:false})
    const [openDelete, setOpenDelete] = useState({open:false})
    const [medico, setMedico] = useState({})
    
    useEffect(() => {
      (async () => {
        try {
          setLoading(true)
          const response = await MedicoService.getMedicos();
          dispatch({
            type: 'SET_MEDICOS',
            payload: response.data,
          })              
        } catch (error) {
          setLoading(false)
          dispatch({
            type: 'SET_SNACKBAR',
            payload: {
                message: 'Erro ao buscar os médicos cadastradas.',
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
    const handleOpenModalEdit = (medico) =>{
        console.log(medico)
        setMedico(medico)
        setOpenEdit({open:true})
    }
    const handleCloseModalEdit = () => {
        setMedico({})
        setOpenEdit(false)
    }    

    const handleOnchageEdit = (e) =>{
        setMedico(prevState => ({
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
            <MedicoListToolbar />
            {loading
            ?(
                <Box sx={{ pt: 3 }}>
                    <Loading />
                </Box>
            ):(
                <Box sx={{ pt: 3 }}>
                  {state.medicos.length > 0 
                  ?(<MedicoListResults medicos={state.medicos} openHandleEdit={handleOpenModalEdit} openHandleDelete={handleOpenModalDelete}/>)
                  :null}
                </Box>
           )}
           <ModalEditMedico open={openEdit.open} onClose={handleCloseModalEdit} onChange={handleOnchageEdit} medico={medico}/>
           <ModalDeleteMedico open={openDelete.open} onClose={handleCloseModalDelete} id={openDelete.id} />
        </Container>    
      </Box>
    </>
  );
};

export default withStyles()(Medico);
