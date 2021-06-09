import { RequestService } from '../Services';

const PATH = 'procedimentos'

function getProcedimentos() {
    return new Promise((resolve, reject) =>
        RequestService
            .get(`${PATH}`,null,null,null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function getProcedimentosByAnything(value) {
    return new Promise((resolve, reject) =>
        RequestService
            .post(`${PATH}/anything`,value,null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function saveProcedimento(values) {
    return new Promise((resolve, reject) =>
        RequestService
            .post(`${PATH}`, values, null, null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function updateProcedimento(values) {
    return new Promise((resolve, reject) =>
        RequestService
            .put(`${PATH}`, values, null, null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function delProcedimento(id) {
    console.log(`${PATH}/${id}`)
    return new Promise((resolve, reject) =>
        RequestService
            .delete(`${PATH}/${id}`,null, null, null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

export {
    getProcedimentos as getProcedimentosService,
    getProcedimentosByAnything as getProcedimentosByAnythingService,
    saveProcedimento as saveProcedimentoService,
    updateProcedimento as updateProcedimentoService,
    delProcedimento as delProcedimentoService
}

const ProcedimentoService = {
    getProcedimentos,
    getProcedimentosByAnything,
    saveProcedimento,
    updateProcedimento,
    delProcedimento
}


export default ProcedimentoService;