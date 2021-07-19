import moment from 'moment';
import { useEffect, useState, useContext } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TablePagination
} from '@material-ui/core';
import AppContext from 'src/AppContext';
import { ArrowUpward } from '@material-ui/icons';

const DashboardList = ({openHandleEdit, openHandleEditAcompanhamento}) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [user, setUser] = useState({});
  const { state, dispatch } = useContext(AppContext)
  const [sortPaciente,setSortPaciente] = useState("asc")
  const [sortMedico,setSortMedico] = useState("asc")
  const [sortProcedimento,setSortProcedimento] = useState("asc")
  const [sortData,setSortData] = useState("desc")
 
  function dynamicSort(property, order) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    if (order == "asc"){
      return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
      }

    }else{
      return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
        return result * sortOrder;
      }
    }
  }

  useEffect(()=>{
    setUser(JSON.parse(window.sessionStorage.getItem("user")))
    dispatch({
      type: 'SET_USER',
      payload: JSON.parse(window.sessionStorage.getItem("user"))
    })

    state.producao_list.sort(dynamicSort("data_procedimento", "desc"))   
    dispatch({
      type: 'SET_PRODUCAO_LIST',
      payload: state.producao_list,
    }) 

  },[])

  const orderBy = (field, sort) => {
    
    state.producao_list.sort(dynamicSort(field, sort))   
    dispatch({
      type: 'SET_PRODUCAO_LIST',
      payload: state.producao_list,
    }) 
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event,newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
      <CardHeader title="Acompanhamento de Status" />
        <Divider />
        <PerfectScrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Status Finaceiro
                  </TableCell>
                  <TableCell>
                    Status Prévia
                  </TableCell>
                  <TableCell>
                    Status Reembolso
                  </TableCell>
                  <TableCell sortDirection="asc" onClick={()=>{
                    setSortPaciente(sortPaciente=="asc"?"desc":"asc")
                    orderBy("nome_paciente",sortPaciente)
                  }}>
                    Nome Paciente
                  </TableCell>
                  <TableCell sortDirection="asc" onClick={()=>{
                    setSortMedico(sortMedico=="asc"?"desc":"asc")
                    orderBy("nome_medico",sortMedico)
                  }}>
                    Nome Médico
                  </TableCell>
                  <TableCell sortDirection="asc" onClick={()=>{
                    setSortProcedimento(sortProcedimento=="asc"?"desc":"asc")
                    orderBy("procedimento",sortProcedimento)
                  }}>
                    Procedimento
                  </TableCell>
                  <TableCell sortDirection="asc" onClick={()=>{
                    setSortData(sortData=="asc"?"desc":"asc")
                    orderBy("data_procedimento",sortData)
                  }}>
                    Data Procedimento
                  </TableCell>
                  <TableCell sortDirection="desc">
                    Divergência Financeira
                  </TableCell>
                  <TableCell sortDirection="desc">
                    Divergência Prévia
                  </TableCell>
                  <TableCell sortDirection="desc">
                    Divergência Reembolso
                  </TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
              {state.producao_list.slice(limit*page, limit*(page+1)).map((dash) => (
                       <TableRow
                    hover
                    key={dash.id}
                  >
                    <TableCell>
                    {user.roles == 'admin' ?
                      <Button
                        onClick={()=>openHandleEdit(dash.id_procedimento)}
                      >
                        <Chip
                          color={dash.status_financeiro=="OK"?"primary":"error"}
                          label={dash.status_financeiro=="OK"?"OK":"Divergente"}
                          size="small"
                        />

                      </Button>:
                      <Chip
                        color={dash.status_financeiro=="OK"?"primary":"error"}
                        label={dash.status_financeiro=="OK"?"OK":"Divergente"}
                        size="small"
                      />
                    
                    }
                    </TableCell>
                    <TableCell>
                    {user.roles == 'admin' ?
                      <Button disabled = {dash.status_previa==" - "?false:false}
                        onClick={()=>openHandleEditAcompanhamento(dash.id_procedimento)}
                      >
                      <Chip
                        color={(dash.status_previa==" - "||dash.status_previa=="OK")?"primary":"error"}
                        label={(dash.status_previa==" - "||dash.status_previa=="OK")?"OK":"Divergente"}
                        size="small"
                      />
                      </Button>:
                      <Chip
                        color={(dash.status_previa==" - " || dash.status_previa=="OK")?"primary":"error"}
                        label={(dash.status_previa==" - " || dash.status_previa=="OK")?"OK":"Divergente"}
                        size="small"
                      />
                    }                    
                    </TableCell>
                    <TableCell>
                    {user.roles == 'admin' ?
                      <Button disabled = {dash.status_previa==" - "?false:false}
                        onClick={()=>openHandleEditAcompanhamento(dash.id_procedimento)}
                      >
                      <Chip
                        color={(dash.status_reembolso==" - " || dash.status_reembolso=="OK")?"primary":"error"}
                        label={(dash.status_reembolso==" - " || dash.status_reembolso=="OK")?"OK":"Divergente"}
                        size="small"
                      />
                      </Button>:
                      <Chip
                      color={(dash.status_reembolso==" - " || dash.status_reembolso=="OK")?"primary":"error"}
                      label={(dash.status_reembolso==" - " || dash.status_reembolso=="OK")?"OK":"Divergente"}
                      size="small"
                    />}
                    </TableCell>
                    <TableCell>
                      {dash.nome_paciente}
                    </TableCell>
                    <TableCell>
                      {dash.nome_medico}
                    </TableCell>
                    <TableCell>
                      {dash.procedimento}
                    </TableCell>
                    <TableCell>
                    {dash.data_procedimento>0?moment(dash.data_procedimento * 1000).format("DD/MM/YYYY"):""}
                    </TableCell>
                    <TableCell>
                      {dash.status_financeiro}
                    </TableCell>
                    <TableCell>
                      {dash.status_previa}
                    </TableCell>
                    <TableCell>
                      {dash.status_reembolso}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
         <TablePagination
        component="div"
        count={state.producao_list.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
        </Box>
      </Card>
    );
}

export default DashboardList;
