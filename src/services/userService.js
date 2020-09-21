import utilService from './utilService'
import httpService from './httpService'

export default {
    getUser,
    signup,
    login,
    logout,
}

// const users = [
//     {
//         fname: 'adi',
//         lname: 'peled',
//         email: "adi@gmail.com",
//         password: '123',
//         isAdmin: true
//     },
//     {
//         fname: 'maor',
//         lname: 'lozoher',
//         email: "maor@gmail.com",
//         password: '345',
//         isAdmin: false
//     },
// ]

let loggedinUser = null


function getUser() {
    return sessionStorage.getItem('user')
}

async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    return _handleLogin(user)
}

async function logout() {
    await httpService.post('auth/logout');
    sessionStorage.clear();
    loggedinUser = null
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    return _handleLogin(user)
}

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    loggedinUser = user
    return user;
}


