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
                  Procedimento
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
                  Valor
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
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comercial_list.slice(0, limit).map((comercial) => (
                <TableRow
                  hover
                  key={comercial.id}
                >
                  <TableCell>
                    {comercial.desc_procedimento}
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
                    R${comercial.valor_parcelas}
                  </TableCell>
                  <TableCell>
                    {comercial.tipo_pagamento_desc}
                  </TableCell>
                  <TableCell>
                    {comercial.forma_pagamento_desc}
                  </TableCell>
                  <TableCell>
                    {moment(comercial.data_emissao_nf * 1000).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    {moment(comercial.data_vencimento * 1000).format("DD/MM/YYYY")}
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
