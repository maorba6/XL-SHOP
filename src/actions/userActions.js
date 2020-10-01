import userService from "../services/userService"

const _setUser = (user) => ({ type: 'SET_USER', user })



export function setUser() {
    return async dispatch => {
        const user = await userService.getUser()
        dispatch(_setUser(user))
    }
}


export function saveUser(user) {
    console.log(user);
    return async dispatch => {
        console.log('before service');
        await userService.updateUser(user)
        console.log('after service');

        dispatch(_setUser(JSON.stringify(user)))
    }
}