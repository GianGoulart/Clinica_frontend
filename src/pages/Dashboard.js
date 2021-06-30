import { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import DashboardList from 'src/components/dashboard/DashboardList';
import { DashboardService } from 'src/services/Services';
import AppContext from 'src/AppContext';


const Dashboard = () => {
  const [loading, setLoading] = useState(false)
  const { state, dispatch } = useContext(AppContext)
  
  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const response = await DashboardService.getDashboard();
        console.log(response.data)
        dispatch({
          type: 'SET_PRODUCAO_LIST',
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
                  ?(<DashboardList dashboardlist={state.producao_list}/>)
                  :null}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
  );
}

export default Dashboard;
