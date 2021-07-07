import { useContext, useState } from 'react';
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
import AppContext from 'src/AppContext';

const MedicoListResults = ({ medicos, openHandleEdit, openHandleDelete}) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const {state, dispatch } = useContext(AppContext)

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
                  Especialidade
                </TableCell>
                {
                  state.user.roles == 'admin' &&
                <TableCell>
                  Ações
                </TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {medicos.slice(limit*page, limit*(page+1)).map((medico) => (
                <TableRow
                  hover
                  key={medico.id}
                >
                  <TableCell>
                    {medico.nome}
                  </TableCell>
                  <TableCell>
                    {medico.especialidade}
                  </TableCell>
                  {
                  state.user.roles == 'admin' &&

                  <TableCell>                  
                    <IconButton aria-label="editar" color="primary" onClick={() => openHandleEdit(medico)}>
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" color="secondary" onClick={() => openHandleDelete( medico.id)}>
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
