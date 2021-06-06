import { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
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
import getInitials from 'src/utils/getInitials';

const PacienteListResults = ({  pacientes, openHandleEdit, openHandleDelete }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
 
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
                  Cód
                </TableCell>
                <TableCell>
                  Nome
                </TableCell>
                <TableCell>
                  CPF
                </TableCell>
                <TableCell>
                  Convênio
                </TableCell>
                <TableCell>
                  Plano
                </TableCell>
                <TableCell>
                  Acomodação
                </TableCell>
                <TableCell>
                  Telefone
                </TableCell>
                <TableCell>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pacientes.slice(0, limit).map((paciente) => (
                <TableRow
                  hover
                  key={paciente.id}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar              
                        sx={{ mr: 2 }}
                      >
                        {getInitials(paciente.nome)}
                      </Avatar>

                    </Box>
                  </TableCell>
                  <TableCell>
                    {paciente.nome}
                  </TableCell>
                  <TableCell>
                    {paciente.cpf}
                  </TableCell>
                  <TableCell>
                    {paciente.convenio}
                  </TableCell>
                  <TableCell>
                    {paciente.plano}
                  </TableCell>
                  <TableCell>
                    {paciente.acomodacao}
                  </TableCell>
                  <TableCell>
                    {paciente.telefone}
                  </TableCell>
                  <TableCell>                  
                    <IconButton aria-label="editar" color="primary" onClick={() => openHandleEdit(paciente)}>
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" color="secondary" onClick={() => openHandleDelete( paciente.id)}>
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
        count={pacientes.length}
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

PacienteListResults.propTypes = {
  pacientes: PropTypes.array.isRequired
};

export default PacienteListResults;
