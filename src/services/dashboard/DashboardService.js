import { RequestService } from '../Services';

const PATH = 'dashboard'

function getDashboard() {
    return new Promise((resolve, reject) =>
        RequestService
            .get(`${PATH}`,null,null,null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}


export {
    getDashboard as getDashboardService,
}

const DashboardService = {
    getDashboard,
}


export default DashboardService;