import { userService } from "../services/userService"

// Action Creator
// const _setUser = (user) => ({ type: 'SET_USER', user })
// const _setUsers = (users) => ({ type: 'SET_USERS', users })
// const _removeUser = (id) => ({ type: 'REMOVE_USER', id })
const _addUser = (user) => ({ type: 'ADD_USER', user })
// const _updateUser = (user) => ({ type: 'UPDATE_USER', user })

// Action Dispatcher 
// export function loadUsers() {
//     return async (dispatch, getState) => {
//         const users = await userService.getUsers(getState().userReducer.filterBy)
//         dispatch(_setUsers(users))
//     }
// }

export function addUser(user){
    return async (dispatch, getState) => {
        const signUp = await userService.addUser(user)
        dispatch(_addUser(signUp)) 
    }
}
