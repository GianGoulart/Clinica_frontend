import { useEffect, useState } from 'react';
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
import { ProcedimentoService } from 'src/services/Services';

const ComercialListResults = ({ comercial_list, openHandleEdit, openHandleDelete}) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [procedimento, setProcedimento] = useState()
  const [loading, setLoading] = useState(false)

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = ( newPage) => {
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
                  Data
                </TableCell>
                <TableCell>
                  Paciente
                </TableCell>
                <TableCell>
                  Procedimento
                </TableCell>
                <TableCell>
                  Médico Principal
                </TableCell>
                <TableCell>
                  Data
                </TableCell>
                <TableCell>
                  Paciente
                </TableCell>
                <TableCell>
                  Procedimento
                </TableCell>
                <TableCell>
                  Médico Principal
                </TableCell>
                <TableCell>
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
                <TableCell>
                  Emissão NF
                </TableCell>
                <TableCell>
                  Vencimento
                </TableCell>
                <TableCell>
                  Data Pagamento
                </TableCell>
                <TableCell>
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
                <TableCell>
                  Ações
                </TableCell>
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
                    {comercial.qtd_parcelas}
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

                  <TableCell>                  
                    <IconButton aria-label="editar" color="primary" onClick={() => openHandleEdit(comercial)}>
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" color="secondary" onClick={() => openHandleDelete(comercial.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
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
