import { useContext, useState, useEffect } from 'react';
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
import moment from "moment";
import AppContext from 'src/AppContext';

const AcompanhamentoListResults = ({ acompanhamentos, openHandleEdit, openHandleDelete}) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const {state, dispatch } = useContext(AppContext)
  const [user, setUser] = useState({});

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
    acompanhamentos.sort(dynamicSort(field, order))   
    dispatch({
      type: 'SET_ACOMPANHAMENTOS',
      payload: acompanhamentos,
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
                <TableCell>
                  Procedimento
                </TableCell>
                <TableCell onClick={()=>orderBy("envio_protocolo","desc")}>
                  Protocolo
                </TableCell>
                <TableCell onClick={()=>orderBy("solicitacao_previa","desc")}>
                  Prévia
                </TableCell>
                <TableCell onClick={()=>orderBy("confirmacao_solicitacao","desc")}>
                  Confirmação
                </TableCell>
                <TableCell onClick={()=>orderBy("finalizacao_previa","desc")}>
                  Finalização
                </TableCell>
                <TableCell onClick={()=>orderBy("envio_convenio","desc")}>
                  Convenio
                </TableCell>
                <TableCell onClick={()=>orderBy("liberacao","desc")}>
                  Liberação
                </TableCell>
                <TableCell onClick={()=>orderBy("repasse_paciente","desc")}>
                  Repasse Paciente
                </TableCell>
                <TableCell onClick={()=>orderBy("repasse_clinica","desc")}>
                  Repasse Clinica
                </TableCell>
                {
                  user.roles == 'admin' &&
                <TableCell>
                  Ações
                </TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {acompanhamentos.slice(limit*page, limit*(page+1)).map((acompanhamento) => (
                <TableRow
                  hover
                  key={acompanhamento.id}
                >
                  <TableCell>
                    {acompanhamento.desc_procedimento}
                  </TableCell>                
                  <TableCell>
                    {acompanhamento.envio_protocolo>0?moment(acompanhamento.envio_protocolo* 1000).format("DD/MM/YYYY"):""}
                  </TableCell>
                  <TableCell>
                    {acompanhamento.solicitacao_previa>0?moment(acompanhamento.solicitacao_previa* 1000).format("DD/MM/YYYY"):""}
                  </TableCell>
                  <TableCell>
                    {acompanhamento.confirmacao_solicitacao>0?moment(acompanhamento.confirmacao_solicitacao* 1000).format("DD/MM/YYYY"):""}
                  </TableCell>
                  <TableCell>
                    {acompanhamento.finalizacao_previa>0?moment(acompanhamento.finalizacao_previa* 1000).format("DD/MM/YYYY"):""}
                  </TableCell>
                  <TableCell>
                    {acompanhamento.envio_convenio>0?moment(acompanhamento.envio_convenio* 1000).format("DD/MM/YYYY"):""}
                  </TableCell>
                  <TableCell>
                    {acompanhamento.liberacao>0?moment(acompanhamento.liberacao* 1000).format("DD/MM/YYYY"):""}
                  </TableCell>
                  <TableCell>
                    {acompanhamento.repasse_paciente>0?moment(acompanhamento.repasse_paciente * 1000).format("DD/MM/YYYY"):""}
                  </TableCell>
                  <TableCell>
                    {acompanhamento.repasse_clinica>0?moment(acompanhamento.repasse_clinica * 1000).format("DD/MM/YYYY"):""}
                  </TableCell>
                  {
                  user.roles == 'admin' &&
                  <TableCell>                  
                    <IconButton aria-label="editar" color="primary" onClick={() => openHandleEdit(acompanhamento)}>
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" color="secondary" onClick={() => openHandleDelete(acompanhamento.id)}>
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
        count={acompanhamentos.length}
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

AcompanhamentoListResults.propTypes = {
  acompanhamentos: PropTypes.array.isRequired
};

export default AcompanhamentoListResults;
