import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Box, Container, withStyles } from '@material-ui/core';
import ComercialListResults from '../../components/comercial/ComercialListResults';
import ComercialListToolbar from '../../components/comercial/ComercialListToolbar';
import AppContext from 'src/AppContext';
import Loading from 'src/components/loading/Loading';
import { ComercialService} from 'src/services/Services';
import ModalEditComercial from 'src/components/comercial/ModalEditComercial';
import ModalDeleteComercial from 'src/components/comercial/ModalDeleteComercial';

const Comercial = () => {
    const [loading, setLoading] = useState(false)
    const { state, dispatch } = useContext(AppContext)
    const [openEdit, setOpenEdit] = useState({open:false})
    const [openDelete, setOpenDelete] = useState({open:false})
    const [comercial, setComercial] = useState({})
    const navigate = useNavigate();

    useEffect(()=>{
      if (state.user == null) {
        navigate("/login")
      }
    },[])

    useEffect(() => {
      (async () => {
        try {
          setLoading(true)
          const comercialList = await ComercialService.getComercial();
          dispatch({
            type: 'SET_COMERCIAL_LIST',
            payload: comercialList.data,
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
    const handleOpenModalEdit = (comercial) =>{
      var list = [] 
      list.push(comercial)
      setComercial(list)
      setOpenEdit({open:true})
    }
    const handleCloseModalEdit = () => {
      setComercial({})
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
            <ComercialListToolbar procedimentos={state.procedimentos} medicos={state.medicos}/>
            {loading
            ?(
                <Box sx={{ pt: 3 }}>
                    <Loading />
                </Box>
            ):(
                <Box sx={{ pt: 3 }}>
                  {state.comercial_list.length > 0 
                  ?(<ComercialListResults comercial_list={state.comercial_list} openHandleEdit={handleOpenModalEdit} openHandleDelete={handleOpenModalDelete}/>)
                  :null}
                </Box>
           )}
           <ModalEditComercial open={openEdit.open} onClose={handleCloseModalEdit} 
             comercialEdit={comercial} procedimentos={state.procedimentos} medicos={state.medicos}/>
           <ModalDeleteComercial open={openDelete.open} onClose={handleCloseModalDelete} id={openDelete.id} />
        </Container>    
      </Box>
    </>
  );
};

export default withStyles()(Comercial);
