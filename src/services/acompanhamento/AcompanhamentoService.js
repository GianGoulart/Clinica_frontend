import { RequestService } from '../Services';

const PATH = 'acompanhamentos'

function getAcompanhamento() {
    return new Promise((resolve, reject) =>
        RequestService
            .get(`${PATH}`,null,null,null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function getAcompanhamentoByAnything(value) {
    return new Promise((resolve, reject) =>
        RequestService
            .post(`${PATH}/anything`,value,null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function getAcompanhamentoByProcedimento(id) {
    return new Promise((resolve, reject) =>
        RequestService
            .get(`${PATH}/byProcedimento/${id}`,null,null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function saveAcompanhamento(values) {
    return new Promise((resolve, reject) =>
        RequestService
            .post(`${PATH}`, values, null, null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function updateAcompanhamento(values) {
    return new Promise((resolve, reject) =>
        RequestService
            .put(`${PATH}`, values, null, null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function delAcompanhamento(id) {
    console.log(`${PATH}/${id}`)
    return new Promise((resolve, reject) =>
        RequestService
            .delete(`${PATH}/${id}`,null, null, null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

export {
    getAcompanhamento as getAcompanhamentoService,
    getAcompanhamentoByAnything as getAcompanhamentoByAnythingService,
    getAcompanhamentoByProcedimento as getAcompanhamentoByProcedimentoService,
    saveAcompanhamento as saveAcompanhamentoService,
    updateAcompanhamento as updateAcompanhamentoService,
    delAcompanhamento as delAcompanhamentoService
}

const AcompanhamentoService = {
    getAcompanhamento,
    getAcompanhamentoByAnything,
    getAcompanhamentoByProcedimento,
    saveAcompanhamento,
    updateAcompanhamento,
    delAcompanhamento
}


export default AcompanhamentoService;