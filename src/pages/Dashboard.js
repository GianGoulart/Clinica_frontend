import { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Button,
  makeStyles,
  Paper
} from '@material-ui/core';
import DashboardList from 'src/components/dashboard/DashboardList';
import { AcompanhamentoService, DashboardService, MedicoService, ProcedimentoService } from 'src/services/Services';
import AppContext from 'src/AppContext';
import ModalEditComercial from 'src/components/comercial/ModalEditComercial';
import Comercialervice from 'src/services/comercial/ComercialService';
import ModalAddComercial from 'src/components/comercial/ModalAddComercial';
import ModalEditAcompanhamento from 'src/components/acompanhamento/ModalEditAcompanhamento';
import ModalAddAcompanhamento from 'src/components/acompanhamento/ModalAddAcompanhamento';
import { useNavigate } from 'react-router-dom'; 

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    textAlign: 'center',
    color: theme.palette.text.secondary,

  },
  field: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const { state, dispatch } = useContext(AppContext)
  const [openEdit, setOpenEdit] = useState({open:false})
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openEditAcompanhamento, setOpenEditAcompanhamento] = useState({open:false})
  const [openModalAddAcompanhamento, setOpenModalAddAcompanhamento] = useState(false)
  const [comercial, setComercial] = useState({})
  const [acompanhamento, setAcompanhamento] = useState({})
  const [search, setSearch] = useState({})
  const [fullList, setFullList] = useState({})

  const classes = useStyles();
  
  useEffect(()=>{
    if (state.user == null) {
      navigate("/login")
    }
  },[])

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const response = await DashboardService.getDashboard();
        dispatch({
          type: 'SET_PRODUCAO_LIST',
          payload: response.data,
        })              
        setFullList(response.data)

        const procedimentos = await ProcedimentoService.getProcedimentos();
        dispatch({
          type: 'SET_PROCEDIMENTOS',
          payload: procedimentos.data,
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
              message: 'Erro ao buscar os médicos cadastradas.',
              color: 'red'
          },
        })          
      } finally {
        setLoading(false)
      }
    })();
    },[]);

    const handleOpenModalEdit = (id_procedimento) =>{
      (async () => {
        try {
          setLoading(true)
          const response = await Comercialervice.getComercialByProcedimento(id_procedimento);            
          setComercial(response.data)
          if (response.data.id == ""){
            setOpenModalAdd({open:true})
          }else{
            setOpenEdit({open:true})
          }

        } catch (error) {
          setLoading(false)
          dispatch({
            type: 'SET_SNACKBAR',
            payload: {
                message: 'Erro ao buscar o registro comercial.',
                color: 'error'
            },
          })          
        } finally {
          setLoading(false)
        }
      })()

    }
  
    const handleOpenModalEditAcompanhamento = (id_procedimento) =>{
      (async () => {
        try {
          setLoading(true)
          const response = await AcompanhamentoService.getAcompanhamentoByProcedimento(id_procedimento);            
          setAcompanhamento(response.data)
          if (response.data.id == ""){
            setOpenModalAddAcompanhamento({open:true})
          }else{
            setOpenEditAcompanhamento({open:true})
          }

        } catch (error) {
          setLoading(false)
          dispatch({
            type: 'SET_SNACKBAR',
            payload: {
                message: 'Erro ao buscar o acompanhamento.',
                color: 'error'
            },
          })          
        } finally {
          setLoading(false)
        }
      })()

    }

    const handleOnchange = (e) => {
      setSearch(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))}

    const onSubmit = () => {
      var list = fullList;

      if(parseInt(search.status_financeiro) > 0 ){

        if(parseInt(search.status_financeiro) == 1){
          list = fullList.filter(function (el) {
            return el.status_financeiro != "OK" && el.status_financeiro != " - "         
          });

        }else{
          list = fullList.filter(function (el) {
            return el.status_financeiro == "OK" || el.status_financeiro == " - "         
          });
        } 

      }else if (parseInt(search.status_reembolso) > 0){
        if(parseInt(search.status_reembolso) == 1){
          list = fullList.filter(function (el) {
            return el.status_reembolso != "OK" && el.status_reembolso != " - "         
          });
        }else{
          list = fullList.filter(function (el) {
            return el.status_reembolso == "OK" || el.status_reembolso == " - "         
          });
        } 
      }else if (parseInt(search.status_previa) > 0){
        if(parseInt(search.status_previa) == 1){
          list = fullList.filter(function (el) {
            return el.status_previa != "OK" && el.status_previa != " - "         
          });

        }else{
          list = fullList.filter(function (el) {
            return el.status_previa == "OK" || el.status_previa == " - "         
          });
        } 
      }else{
        dispatch({
          type: 'SET_PRODUCAO_LIST',
          payload: fullList,
        })              
  
      }

      dispatch({
        type: 'SET_PRODUCAO_LIST',
        payload: list,
      })              
      return
    }

    const handleCloseModalAdd = () => {
      setOpenModalAdd(false)
    }

    const handleCloseModalEdit = () => {
      setComercial({})
      setOpenEdit(false)
    }    

    const handleCloseModalAddAcompanhamento = () => {
      setOpenModalAddAcompanhamento(false)
    }

    const handleCloseModalEditAcompanhamento = () => {
      setAcompanhamento({})
      setOpenEditAcompanhamento(false)
    }    
 
  return (
      <>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
        >
          <Container maxWidth={false}>
            <Paper>
              <Box
                className={classes.field}
                sx={{
                  display: 'flex'
                }}
              >
                  <Grid item xs={3} className={classes.field}>
                    <FormControl fullWidth variant="outlined" className={classes.field}>
                        <InputLabel htmlFor="outlined-age-native-simple">Status Financeiro</InputLabel>
                        <Select
                            onChange={e => handleOnchange(e)}
                            native
                            value={search.financeiro}
                            label="Selecione o status"
                            name="status_financeiro"
                        >
                          <option aria-label="Selecione" value={0}> </option> 
                          <option key={1} value={1}>Divergente</option>
                          <option key={2} value={2}>OK</option>
                        </Select>
                    </FormControl>                
                  </Grid> 
                  <Grid item xs={3} className={classes.field}>
                    <FormControl fullWidth variant="outlined" className={classes.field}>
                        <InputLabel htmlFor="outlined-age-native-simple">Status Prévia</InputLabel>
                        <Select
                            onChange={e => handleOnchange(e)}
                            native
                            value={search.previa}
                            label="Selecione o status"
                            name="status_previa"
                        >
                          <option aria-label="Selecione" value={0}> </option> 
                          <option key={1} value={1}>Divergente</option>
                          <option key={2} value={2}>OK</option>
                        </Select>
                    </FormControl>                
                  </Grid> 
                  <Grid item xs={3} className={classes.field}>
                    <FormControl fullWidth variant="outlined" className={classes.field}>
                        <InputLabel htmlFor="outlined-age-native-simple">Status Reembolso</InputLabel>
                        <Select
                            onChange={e => handleOnchange(e)}
                            native
                            value={search.reembolso}
                            label="Selecione o status"
                            name="status_reembolso"
                        >
                          <option aria-label="Selecione" value={0}> </option> 
                          <option key={1} value={1}>Divergente</option>
                          <option key={2} value={2}>OK</option>
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
            <Grid
              container
              spacing={3}
            >        
              <Grid
                item
                lg={12}
                md={12}
                xl={12}
                xs={12}
              >
                {state.producao_list.length > 0 
                  ?(<DashboardList 
                      dashboardlist={state.producao_list} 
                      openHandleEdit={handleOpenModalEdit} 
                      openHandleEditAcompanhamento={handleOpenModalEditAcompanhamento}
                    />)
                  :null}
              </Grid>
            </Grid>
            <ModalEditComercial open={openEdit.open} onClose={handleCloseModalEdit} 
              comercialEdit={comercial} procedimentos={state.procedimentos} medicos={state.medicos}/>
            <ModalAddComercial 
                open={openModalAdd} 
                onClose={handleCloseModalAdd} 
                procedimentos={state.procedimentos}
                medicos={state.medicos}
                comercialProps={{}}
                planoContas={state.planoContas}
                contas={state.contas}
            />
             <ModalEditAcompanhamento open={openEditAcompanhamento.open} onClose={handleCloseModalEditAcompanhamento}
             acompanhamentoEdit={acompanhamento} procedimentos={state.procedimentos} />
            <ModalAddAcompanhamento 
              open={openModalAddAcompanhamento} 
              onClose={handleCloseModalAddAcompanhamento} 
              procedimentos={state.procedimentos}      
            />
          </Container>
        </Box>
      </>
  );
}

export default Dashboard;
