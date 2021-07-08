import { RequestService } from '../Services';

const PATH = 'medicos'

function getMedicos() {
    return new Promise((resolve, reject) =>
        RequestService
            .get(`${PATH}`,null,null,null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function getMedicosByAnything(value) {
    return new Promise((resolve, reject) =>
        RequestService
            .post(`${PATH}/anything`,value,null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function saveMedico(values) {
    return new Promise((resolve, reject) =>
        RequestService
            .post(`${PATH}`, values, null, null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function updateMedico(values) {
    return new Promise((resolve, reject) =>
        RequestService
            .put(`${PATH}`, values, null, null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function delMedico(id) {
    return new Promise((resolve, reject) =>
        RequestService
            .delete(`${PATH}/${id}`,null, null, null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

export {
    getMedicos as getMedicosService,
    getMedicosByAnything as getMedicosByAnythingService,
    saveMedico as saveMedicoService,
    updateMedico as updateMedicoService,
    delMedico as delMedicoService
}

const MedicoService = {
    getMedicos,
    getMedicosByAnything,
    saveMedico,
    updateMedico,
    delMedico
}


export default MedicoService;