import { useState } from 'react';
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

const FinanceiroListResults = ({ financeiro_list, openHandleEdit, openHandleDelete}) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

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
                  Comercial Desc.
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
                Valor Ajuste
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
              {financeiro_list.slice(0, limit).map((financeiro) => (
                <TableRow
                  hover
                  key={financeiro.id}
                >
                  <TableCell>
                    {financeiro.desc_comercial}
                  </TableCell>
                  <TableCell>
                    {financeiro.data_pagamento>0?moment(financeiro.data_pagamento * 1000).format("DD/MM/YYYY"):""}
                  </TableCell>
                  <TableCell>
                    {financeiro.data_compensacao>0?moment(financeiro.data_compensacao * 1000).format("DD/MM/YYYY"):""}
                  </TableCell>
                  <TableCell>
                    {financeiro.plano_contas_desc}
                  </TableCell>
                  <TableCell>
                    {financeiro.conta_desc}
                  </TableCell>
                  <TableCell>
                  R${financeiro.valor_ajuste}
                  </TableCell>
                  <TableCell>
                  R${financeiro.valor_liquido}
                  </TableCell>
                  <TableCell>                  
                    <IconButton aria-label="editar" color="primary" onClick={() => openHandleEdit(financeiro)}>
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" color="secondary" onClick={() => openHandleDelete( financeiro.id)}>
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
        count={financeiro_list.length}
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

FinanceiroListResults.propTypes = {
  financeiro_list: PropTypes.array.isRequired
};

export default FinanceiroListResults;
