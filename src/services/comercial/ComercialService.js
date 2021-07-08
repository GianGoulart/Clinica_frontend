import { RequestService } from '../Services';

const PATH = 'comercial'

function getComercial() {
    return new Promise((resolve, reject) =>
        RequestService
            .get(`${PATH}`,null,null,null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function getComercialByAnything(value) {
    return new Promise((resolve, reject) =>
        RequestService
            .post(`${PATH}/anything`,value,null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}


function getComercialByProcedimento(id) {
    return new Promise((resolve, reject) =>
        RequestService
            .get(`${PATH}/byProcedimento/${id}`,null,null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function saveComercial(values) {
    return new Promise((resolve, reject) =>
        RequestService
            .post(`${PATH}`, values, null, null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function updateComercial(values) {
    return new Promise((resolve, reject) =>
        RequestService
            .put(`${PATH}`, values, null, null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function delComercial(id) {
    return new Promise((resolve, reject) =>
        RequestService
            .delete(`${PATH}/${id}`,null, null, null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

export {
    getComercial as getComercialService,
    getComercialByAnything as getComercialByAnythingService,
    getComercialByProcedimento as getComercialByProcedimentoService,
    saveComercial as saveComercialervice,
    updateComercial as updateComercialervice,
    delComercial as delComercialervice
}

const Comercialervice = {
    getComercial,
    getComercialByAnything,
    getComercialByProcedimento,
    saveComercial,
    updateComercial,
    delComercial
}


export default Comercialervice;