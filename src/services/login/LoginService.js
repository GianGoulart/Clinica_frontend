import { RequestService } from '../Services';

const PATH = 'user'

function getLogin(user) {
    return new Promise((resolve, reject) =>
        RequestService
            .post(`${PATH}/getUser`,user,null,null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    );
}

export {
    getLogin as getLoginService,
}

const LoginService = {
    getLogin,
}


export default LoginService;