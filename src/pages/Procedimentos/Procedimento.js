import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, withStyles } from '@material-ui/core';
import ProcedimentoListResults from '../../components/procedimentos/ProcedimentoListResults';
import ProcedimentoListToolbar from '../../components/procedimentos/ProcedimentoListToolbar';
import AppContext from 'src/AppContext';
import Loading from 'src/components/loading/Loading';
import { MedicoService, PacienteService, ProcedimentoService } from 'src/services/Services';
import ModalEditProcedimento from 'src/components/procedimentos/ModalEditProcedimento';
import ModalDeleteProcedimento from 'src/components/procedimentos/ModalDeleteProcedimento';
import moment from "moment";

const Procedimento = () => {
    const [loading, setLoading] = useState(false)
    const { state, dispatch } = useContext(AppContext)
    const [openEdit, setOpenEdit] = useState({open:false})
    const [openDelete, setOpenDelete] = useState({open:false})
    const [procedimento, setProcedimento] = useState({})
    
    useEffect(() => {
      (async () => {
        try {
          setLoading(true)
          const procedimentos = await ProcedimentoService.getProcedimentos();
          dispatch({
            type: 'SET_PROCEDIMENTOS',
            payload: procedimentos.data,
          })              

          const pacientes = await PacienteService.getPacientes();
          dispatch({
            type: 'SET_PACIENTES',
            payload: pacientes.data,
          })              

          const medicos = await MedicoService.getMedicos();
          dispatch({
            type: 'SET_MEDICOS',
            payload: medicos.data,
          })              

        } catch (error) {
          setLoading(false)
          dispatch({
            type: 'SET_SNACKBAR',
            payload: {
                message: 'Erro ao buscar os procedimentos cadastradas.',
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
    const handleOpenModalEdit = (procedimento) => {
      setProcedimento(procedimento)
      setOpenEdit({open:true})
    }
    const handleCloseModalEdit = () => {
        setProcedimento({})
        setOpenEdit(false)
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
            <ProcedimentoListToolbar pacientes={state.pacientes} medicos={state.medicos} />
            {loading
            ?(
                <Box sx={{ pt: 3 }}>
                    <Loading />
                </Box>
            ):(
                <Box sx={{ pt: 3 }}>
                  {state.procedimentos.length > 0 
                  ?(<ProcedimentoListResults procedimentos={state.procedimentos} openHandleEdit={handleOpenModalEdit} openHandleDelete={handleOpenModalDelete}/>)
                  :null}
                </Box>
           )}
           <ModalEditProcedimento open={openEdit.open} onClose={handleCloseModalEdit} 
            pacientes={state.pacientes} medicos={state.medicos} procedimentoEdit={procedimento}/>
           <ModalDeleteProcedimento open={openDelete.open} onClose={handleCloseModalDelete} id={openDelete.id} />
        </Container>    
      </Box>
    </>
  );
};

export default withStyles()(Procedimento);
