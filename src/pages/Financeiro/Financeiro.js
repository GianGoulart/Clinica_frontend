import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, withStyles } from '@material-ui/core';
import FinanceiroListResults from '../../components/financeiro/FinanceiroListResults';
import FinanceiroListToolbar from '../../components/financeiro/FinanceiroListToolbar';
import AppContext from 'src/AppContext';
import Loading from 'src/components/loading/Loading';
import { ComercialService, FinanceiroService, MedicoService, PacienteService, ProcedimentoService } from 'src/services/Services';
import ModalEditFinanceiro from 'src/components/financeiro/ModalEditFinanceiro';
import ModalDeleteFinanceiro from 'src/components/financeiro/ModalDeleteFinanceiro';
import moment from "moment";

const Financeiro = () => {
    const [loading, setLoading] = useState(false)
    const { state, dispatch } = useContext(AppContext)
    const [openEdit, setOpenEdit] = useState({open:false})
    const [openDelete, setOpenDelete] = useState({open:false})
    const [financeiro, setFinanceiro] = useState({})
    
    useEffect(() => {
      (async () => {
        try {
          setLoading(true)
          const comercial_list = await ComercialService.getComercial();
          dispatch({
            type: 'SET_COMERCIAL_LIST',
            payload: comercial_list.data,
          })             
          const financeiro_list = await FinanceiroService.getFinanceiro();
          dispatch({
            type: 'SET_FINANCEIRO_LIST',
            payload: financeiro_list.data,
          })              

        } catch (error) {
          setLoading(false)
          dispatch({
            type: 'SET_SNACKBAR',
            payload: {
                message: 'Erro ao buscar os cadastros.',
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
    const handleOpenModalEdit = (financeiro) =>{
      setFinanceiro(financeiro)
      setOpenEdit({open:true})
    }
    const handleCloseModalEdit = () => {
      setFinanceiro({})
        setOpenEdit(false)
    }    

    const handleOnchageEdit = (e) =>{
      setFinanceiro(prevState => ({
            ...prevState,
            [e.target.name]:e.target.name == "data_pagamento" || e.target.name == "data_compensacao"? moment(e.target.value).utc().unix():e.target.value
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
            <FinanceiroListToolbar comercial_list={state.comercial_list} />
            {loading
            ?(
                <Box sx={{ pt: 3 }}>
                    <Loading />
                </Box>
            ):(
                <Box sx={{ pt: 3 }}>
                  {state.financeiro_list.length > 0 
                  ?(<FinanceiroListResults financeiro_list={state.financeiro_list} openHandleEdit={handleOpenModalEdit} openHandleDelete={handleOpenModalDelete}/>)
                  :null}
                </Box>
           )}
           <ModalEditFinanceiro open={openEdit.open} onClose={handleCloseModalEdit} onChange={handleOnchageEdit}
            comercial_list={state.comercial_list} financeiro={financeiro}/>
           <ModalDeleteFinanceiro open={openDelete.open} onClose={handleCloseModalDelete} id={openDelete.id} />
        </Container>    
      </Box>
    </>
  );
};

export default withStyles()(Financeiro);
