import { useContext, useEffect, useState} from 'react';
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

const ComercialListResults = ({ comercial_list, openHandleEdit, openHandleDelete}) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const {state, dispatch } = useContext(AppContext)
  const [user, setUser] = useState({});
  const [sortPaciente,setSortPaciente] = useState("asc")
  const [sortMedico,setSortMedico] = useState("asc")
  const [sortProcedimento,setSortProcedimento] = useState("asc")
  const [sortMedicoPart,setSortMedicoPart] = useState("asc")
  const [sortEmissao,setSortEmissao] = useState("desc")
  const [sortVencimento,setSortVencimento] = useState("desc")
  const [sortPgto,setSortPgto] = useState("desc")
  const [sortCompensacao,setSortCompensacao] = useState("desc")
  
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

  },[])

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const orderBy = (field, order) => {
    comercial_list.sort(dynamicSort(field, order))   
    dispatch({
      type: 'SET_COMERCIAL_LIST',
      payload: comercial_list,
    }) 
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
                  Data
                </TableCell>
                  <TableCell onClick={()=>orderBy("nome_paciente","asc")}
                    style={{cursor:"pointer"}}
                  >
                  Paciente
                </TableCell>
                <TableCell>
                  Procedimento
                </TableCell>
                <TableCell onClick={()=>orderBy("nome_medico","asc")}
                  style={{cursor:"pointer"}}
                >
                  Médico Principal
                </TableCell>
                <TableCell onClick={()=>orderBy("nome_medico_part","asc")}
                  style={{cursor:"pointer"}}
                >
                  Médico Participante
                </TableCell>
                <TableCell>
                  Função
                </TableCell>
                <TableCell>
                  Parcelas
                </TableCell>
                <TableCell>
                  Valor Parcela
                </TableCell>
                <TableCell>
                  Tipo Pgto
                </TableCell>
                <TableCell>
                  Forma Pgto
                </TableCell>
                <TableCell onClick={()=>orderBy("data_emissao_nf","desc")}
                  style={{cursor:"pointer"}}
                >
                  Emissão NF
                </TableCell>
                <TableCell onClick={()=>orderBy("data_vencimento","desc")}
                  style={{cursor:"pointer"}}
                >
                  Vencimento
                </TableCell>
                <TableCell onClick={()=>orderBy("data_pagamento","desc")}
                  style={{cursor:"pointer"}}
                >
                  Data Pagamento
                </TableCell>
                <TableCell onClick={()=>orderBy("data_compensacao","desc")}
                  style={{cursor:"pointer"}}
                >
                  Data Compensação
                </TableCell>
                <TableCell>
                  Plano Contas
                </TableCell>
                <TableCell>
                  Conta
                </TableCell>
                <TableCell>
                  Valor Líquido
                </TableCell>
                {
                  user.roles == 'admin' &&
                <TableCell>
                  Ações
                </TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {comercial_list.slice(limit*page, limit*(page+1)).map((comercial) => (
                <TableRow
                  hover
                  key={comercial.id}
                >
                  <TableCell>
                    {comercial.procedimento.data>0?moment(comercial.procedimento.data * 1000).format("DD/MM/YYYY"):""}
                  </TableCell>                
                  <TableCell>
                    {comercial.procedimento.nome_paciente}
                  </TableCell>                
                  <TableCell>
                    {comercial.procedimento.nome_procedimento}
                  </TableCell>                
                  <TableCell>
                    {comercial.nome_medico}
                  </TableCell>                
                  <TableCell>
                    {comercial.nome_medico_part}
                  </TableCell>
                  <TableCell>
                    {comercial.funcao_medico_part_desc}
                  </TableCell>
                  <TableCell>
                    {comercial.qtd_parcelas}x
                  </TableCell>
                  <TableCell>
                  {comercial.valor_parcelas.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                  </TableCell>
                  <TableCell>
                    {comercial.tipo_pagamento_desc}
                  </TableCell>
                  <TableCell>
                    {comercial.forma_pagamento_desc}
                  </TableCell>
                  <TableCell>
                    {comercial.data_emissao_nf>0?moment(comercial.data_emissao_nf * 1000).format("DD/MM/YYYY"):""}
                  </TableCell>
                  <TableCell>
                    {comercial.data_vencimento>0?moment(comercial.data_vencimento * 1000).format("DD/MM/YYYY"):""}
                  </TableCell>
                  <TableCell>
                    {comercial.data_pagamento>0?moment(comercial.data_pagamento * 1000).format("DD/MM/YYYY"):""}
                  </TableCell>
                  <TableCell>
                    {comercial.data_compensacao>0?moment(comercial.data_compensacao * 1000).format("DD/MM/YYYY"):""}
                  </TableCell>
                  <TableCell>
                    {comercial.plano_contas_desc}
                  </TableCell>
                  <TableCell>
                    {comercial.conta_desc}
                  </TableCell>
                  <TableCell>
                  {comercial.valor_liquido.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                  </TableCell>
                  {
                  user.roles == 'admin' &&
                  <TableCell>                  
                    <IconButton aria-label="editar" color="primary" onClick={() => openHandleEdit(comercial)}>
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" color="secondary" onClick={() => openHandleDelete(comercial.id)}>
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
        count={comercial_list.length}
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

ComercialListResults.propTypes = {
  comercial_list: PropTypes.array.isRequired
};

export default ComercialListResults;
