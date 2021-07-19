import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  IconButton
} from '@material-ui/core';
import {Delete, Edit} from '@material-ui/icons';
import moment from 'moment';
import AppContext from 'src/AppContext';

const ProcedimentoListResults = ({ procedimentos, openHandleEdit, openHandleDelete}) => {
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



  const orderBy = (field, order) => {
    procedimentos.sort(dynamicSort(field, order))   
    dispatch({
      type: 'SET_PROCEDIMENTOS',
      payload: procedimentos,
    }) 
  };

  useEffect(()=>{
    setUser(JSON.parse(window.sessionStorage.getItem("user")))

  },[])

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell onClick={()=>{
                  setSortPaciente(sortPaciente=="asc"?"desc":"asc")
                  orderBy("nome_paciente",sortPaciente)
                }}>
                  Paciente
                </TableCell>
                <TableCell onClick={()=>{
                  setSortMedico(sortMedico=="asc"?"desc":"asc")
                  orderBy("nome_medico",sortMedico)                  
                }}>
                  Médico
                </TableCell>
                <TableCell sortDirection="asc" onClick={()=>{
                    setSortProcedimento(sortProcedimento=="asc"?"desc":"asc")
                    orderBy("procedimento",sortProcedimento)
                  }}>
                  Procedimento
                </TableCell>
                <TableCell onClick={()=>orderBy("local_procedimento","asc")}>
                  Local
                </TableCell>
                <TableCell onClick={()=>{
                  setSortData(sortData=="asc"?"desc":"asc")
                  orderBy("data",sortData)
                }}>
                  Data
                </TableCell>                
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Valor
                </TableCell>
                <TableCell>
                  Esteira
                </TableCell>
                {
                  user.roles == 'admin' &&

                <TableCell>
                  Ações
                </TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {procedimentos.slice(limit*page, limit*(page+1)).map((procedimento) => (
                <TableRow
                  hover
                  key={procedimento.id}
                >
                  <TableCell>
                    {procedimento.nome_paciente}
                  </TableCell>
                  <TableCell>
                    {procedimento.nome_medico}
                  </TableCell>
                  <TableCell>
                    {procedimento.nome_procedimento}
                  </TableCell>
                  <TableCell>
                    {procedimento.nome_local}
                  </TableCell>
                  <TableCell>
                  {procedimento.data>0?moment(procedimento.data * 1000).format("DD/MM/YYYY"):""}
                  </TableCell>
                  <TableCell>
                    {procedimento.nome_status}
                  </TableCell>
                  <TableCell>
                    {procedimento.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                  </TableCell>
                  <TableCell>
                    {procedimento.desc_esteira}
                  </TableCell>
                  {
                  user.roles == 'admin' &&

                  <TableCell>                  
                    <IconButton aria-label="editar" color="primary" onClick={() => openHandleEdit(procedimento)}>
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" color="secondary" onClick={() => openHandleDelete( procedimento.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={procedimentos.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
    </>
  );
};

ProcedimentoListResults.propTypes = {
  procedimentos: PropTypes.array.isRequired
};

export default ProcedimentoListResults;
