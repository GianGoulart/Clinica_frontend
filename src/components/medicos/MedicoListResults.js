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

const MedicoListResults = ({ medicos, openHandleEdit, openHandleDelete}) => {
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
                  Nome
                </TableCell>
                <TableCell>
                  CPF
                </TableCell>
                <TableCell>
                  CNPJ
                </TableCell>
                <TableCell>
                  Razão Social
                </TableCell>
                <TableCell>
                  Banco PF
                </TableCell>
                <TableCell>
                  Agência PF
                </TableCell>
                <TableCell>
                  Conta PF
                </TableCell>
                <TableCell>
                  Banco PJ
                </TableCell>
                <TableCell>
                  Agência PJ
                </TableCell>
                <TableCell>
                  Conta PJ
                </TableCell>
                <TableCell>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicos.slice(0, limit).map((medico) => (
                <TableRow
                  hover
                  key={medico.id}
                >
                  <TableCell>
                    {medico.nome}
                  </TableCell>
                  <TableCell>
                    {medico.cpf}
                  </TableCell>
                  <TableCell>
                    {medico.cnpj}
                  </TableCell>
                  <TableCell>
                    {medico.razao_social}
                  </TableCell>
                  <TableCell>
                    {medico.banco_pf}
                  </TableCell>
                  <TableCell>
                    {medico.agencia_pf}
                  </TableCell>
                  <TableCell>
                    {medico.conta_pf}
                  </TableCell>
                  <TableCell>
                    {medico.banco_pj}
                  </TableCell>
                  <TableCell>
                    {medico.agencia_pj}
                  </TableCell>
                  <TableCell>
                    {medico.conta_pj}
                  </TableCell>
                  <TableCell>                  
                    <IconButton aria-label="editar" color="primary" onClick={() => openHandleEdit(medico)}>
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" color="secondary" onClick={() => openHandleDelete( medico.id)}>
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
        count={medicos.length}
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

MedicoListResults.propTypes = {
  medicos: PropTypes.array.isRequired
};

export default MedicoListResults;
