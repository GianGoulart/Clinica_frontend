import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, withStyles } from '@material-ui/core';
import AcompanhamentoListResults from '../../components/acompanhamento/AcompanhamentoListResults';
import AcompanhamentoListToolbar from '../../components/acompanhamento/AcompanhamentoListToolbar';
import AppContext from 'src/AppContext';
import Loading from 'src/components/loading/Loading';
import { AcompanhamentoService, ProcedimentoService } from 'src/services/Services';
import ModalEditAcompanhamento from 'src/components/acompanhamento/ModalEditAcompanhamento';
import ModalDeleteAcompanhamento from 'src/components/acompanhamento/ModalDeleteAcompanhamento';
import moment from "moment";

const Acompanhamento = () => {
    const [loading, setLoading] = useState(false)
    const { state, dispatch } = useContext(AppContext)
    const [openEdit, setOpenEdit] = useState({open:false})
    const [openDelete, setOpenDelete] = useState({open:false})
    const [acompanhamento, setAcompanhamento] = useState({})
    
    useEffect(() => {
      (async () => {
        try {
          setLoading(true)
          const acompanhamentos = await AcompanhamentoService.getAcompanhamento();
          dispatch({
            type: 'SET_ACOMPANHAMENTOS',
            payload: acompanhamentos.data,
          })           
        } catch (error) {
          setLoading(false)
          dispatch({
            type: 'SET_SNACKBAR',
            payload: {
                message: 'Erro ao buscar os dados comerciais cadastradas.',
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
    const handleOpenModalEdit = (acompanhamento) =>{
      setAcompanhamento(acompanhamento)
      setOpenEdit({open:true})
    }
    const handleCloseModalEdit = () => {
      setAcompanhamento({})
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
            <AcompanhamentoListToolbar procedimentos={state.procedimentos} acompanhamentos={state.acompanhamentos}/>
            {loading
            ?(
                <Box sx={{ pt: 3 }}>
                    <Loading />
                </Box>
            ):(
                <Box sx={{ pt: 3 }}>
                  {state.acompanhamentos.length > 0 
                  ?(<AcompanhamentoListResults acompanhamentos={state.acompanhamentos} openHandleEdit={handleOpenModalEdit} openHandleDelete={handleOpenModalDelete}/>)
                  :null}
                </Box>
           )}
           <ModalEditAcompanhamento open={openEdit.open} onClose={handleCloseModalEdit}
             acompanhamentoEdit={acompanhamento} procedimentos={state.procedimentos} />
           <ModalDeleteAcompanhamento open={openDelete.open} onClose={handleCloseModalDelete} id={openDelete.id} />
        </Container>    
      </Box>
    </>
  );
};

export default withStyles()(Acompanhamento);
