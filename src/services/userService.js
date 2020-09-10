import utilService from './utilService'


export default {
    getUser,
    signup,
    login,
    logout,
}

const users = [
    {
        fname: 'adi',
        lname: 'peled',
        email: "adi@gmail.com",
        password: '123',
        isAdmin: true
    },
    {
        fname: 'maor',
        lname: 'lozoher',
        email: "maor@gmail.com",
        password: '345',
        isAdmin: false
    },
]

function getUser() {
    return utilService.loadFromStorage('user')
}

function signup(user) {
    return new Promise((resolve, reject) => {
        user._id = _makeId()
        users.push(user)
        resolve(user)
        utilService.storeToStorage('user', user)
    })
}

function logout() {
    utilService.storeToStorage('user', null)
}

function login(user) {
    return new Promise((resolve, reject) => {
        const u = users.find(u => user.email === u.email)
        if (!u) {
            console.log('wrong mail or password');
            return
        }
        if (u.password === user.password) {
            resolve(u)
            utilService.storeToStorage('user', u)
        }
        else {
            reject('wrong name or password')
        }
    })

}

function _makeId(length = 10) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

