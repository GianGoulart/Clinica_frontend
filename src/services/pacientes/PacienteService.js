import { RequestService } from '../Services';

const PATH = 'pacientes'

function getPacientes() {
    return new Promise((resolve, reject) =>
        RequestService
            .get(`${PATH}`,null,null,null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function getPacientesByAnything(value) {
    return new Promise((resolve, reject) =>
        RequestService
            .post(`${PATH}/anything`,value,null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function savePaciente(values) {
    return new Promise((resolve, reject) =>
        RequestService
            .post(`${PATH}`, values, null, null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function updatePaciente(values) {
    return new Promise((resolve, reject) =>
        RequestService
            .put(`${PATH}`, values, null, null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

function delPaciente(id) {

    return new Promise((resolve, reject) =>
        RequestService
            .delete(`${PATH}/${id}`,null, null, null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

export {
    getPacientes as getPacientesService,
    getPacientesByAnything as getPacientesByAnythingService,
    savePaciente as savePacienteService,
    updatePaciente as updatePacienteService,
    delPaciente as delPacienteService
}

const PacienteService = {
    getPacientes,
    getPacientesByAnything,
    savePaciente,
    updatePaciente,
    delPaciente
}


export default PacienteService;