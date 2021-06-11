import { RequestService } from '../Services';

const PATH = 'financeiro'

function getFinanceiro() {
    return new Promise((resolve, reject) =>
        RequestService
            .get(`${PATH}`,null,null,null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function getFinanceiroByAnything(value) {
    return new Promise((resolve, reject) =>
        RequestService
            .post(`${PATH}/anything`,value,null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function saveFinanceiro(values) {
    return new Promise((resolve, reject) =>
        RequestService
            .post(`${PATH}`, values, null, null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function updateFinanceiro(values) {
    return new Promise((resolve, reject) =>
        RequestService
            .put(`${PATH}`, values, null, null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function delFinanceiro(id) {
    return new Promise((resolve, reject) =>
        RequestService
            .delete(`${PATH}/${id}`,null, null, null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

export {
    getFinanceiro as getFinanceiroService,
    getFinanceiroByAnything as getFinanceiroByAnythingService,
    saveFinanceiro as saveFinanceiroService,
    updateFinanceiro as updateFinanceiroService,
    delFinanceiro as delFinanceiroService
}

const FinanceiroService = {
    getFinanceiro,
    getFinanceiroByAnything,
    saveFinanceiro,
    updateFinanceiro,
    delFinanceiro,
}


export default FinanceiroService;