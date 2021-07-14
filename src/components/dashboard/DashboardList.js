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

const DashboardList = ({dashboardlist, openHandleEdit, openHandleEditAcompanhamento}) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [user, setUser] = useState({});
  const { state, dispatch } = useContext(AppContext)

  useEffect(()=>{
    setUser(JSON.parse(window.sessionStorage.getItem("user")))
    dispatch({
      type: 'SET_USER',
      payload: JSON.parse(window.sessionStorage.getItem("user"))
    })

  },[])

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
                  <TableCell>
                    Nome Paciente
                  </TableCell>
                  <TableCell>
                    Nome Médico
                  </TableCell>
                  <TableCell>
                    Procedimento
                  </TableCell>
                  <TableCell sortDirection="desc">
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
              {dashboardlist.slice(limit*page, limit*(page+1)).map((dash) => (
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
                        color={dash.status_previa==" - "?"primary":"error"}
                        label={dash.status_previa==" - "?"OK":"Divergente"}
                        size="small"
                      />
                      </Button>:
                      <Chip
                        color={dash.status_previa==" - "?"primary":"error"}
                        label={dash.status_previa==" - "?"OK":"Divergente"}
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
                        color={dash.status_reembolso==" - "?"primary":"error"}
                        label={dash.status_reembolso==" - "?"OK":"Divergente"}
                        size="small"
                      />
                      </Button>:
                      <Chip
                      color={dash.status_reembolso==" - "?"primary":"error"}
                      label={dash.status_reembolso==" - "?"OK":"Divergente"}
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
        count={dashboardlist.length}
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
