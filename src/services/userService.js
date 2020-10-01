import httpService from './httpService'

export default {
    getUser,
    signup,
    login,
    logout,
    updateUser
}


let loggedinUser = null


function getUser() {
    return sessionStorage.getItem('user')
}

async function signup(userCreds) {
    const user = await httpService.post('auth/signup', userCreds)
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



async function updateUser(user) {
    return await httpService.put(`user/${user._id}`, user)

}

