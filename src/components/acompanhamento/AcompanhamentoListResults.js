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

const AcompanhamentoListResults = ({ acompanhamentos, openHandleEdit, openHandleDelete}) => {
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
                  Procedimento
                </TableCell>
                <TableCell>
                  Protocolo
                </TableCell>
                <TableCell>
                  Prévia
                </TableCell>
                <TableCell>
                  Confirmação
                </TableCell>
                <TableCell>
                  Finalização
                </TableCell>
                <TableCell>
                  Convenio
                </TableCell>
                <TableCell>
                  Liberação
                </TableCell>
                <TableCell>
                  Repasse Paciente
                </TableCell>
                <TableCell>
                  Repasse Clinica
                </TableCell>
                <TableCell>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {acompanhamentos.slice(0, limit).map((acompanhamento) => (
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
                  <TableCell>                  
                    <IconButton aria-label="editar" color="primary" onClick={() => openHandleEdit(acompanhamento)}>
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" color="secondary" onClick={() => openHandleDelete(acompanhamento.id)}>
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
