import { itemService } from "../services/itemService"

// Action Creator
// const _setItem = (item) => ({ type: 'SET_ITEM', item })
const _setItems = (items) => ({ type: 'SET_ITEMS', items })
// const _removeItem = (id) => ({ type: 'REMOVE_ITEM', id })
// const _addItem = (item) => ({ type: 'ADD_ITEM', item })
// const _updateItem = (item) => ({ type: 'UPDATE_ITEM', item })

// Action Dispatcher 
export function loadItems() {
    return async (dispatch, getState) => {
        const items = await itemService.getItems(getState().itemReducer.filterBy)
        dispatch(_setItems(items))
    }
}

// export function removeItem(id) {
//     return dispatch => {
//         return itemService.deleteItem(id).then(() => dispatch(_removeItem(id)))
//     }
// }

// export function loadItem(id) {
//     return async dispatch => {
//         if (id) {
//             const item = await itemService.getItemById(id)
//             dispatch(_setItem(item))
//         } else {
//             const item = await itemService.getEmptyItem()
//             dispatch(_setItem(item))
//         }
//     }
// }



// export function saveItem(item) {
//     return async dispatch => {
//         const type = (item._id) ? '_updateItem' : 'addItem'
//         const savedItem = itemService.saveItem(item)
//         if (type === '_updateItem') {
//             dispatch(_updateItem(savedItem))
//         } else {
//             dispatch(_addItem(savedItem))
//         }
//     }
//     //   return  item._id ? updateItem(item) : addItem(item)
// }



// export function setFilter(filterBy) {
//     return dispatch => {
//         dispatch({ type: 'SET_FILTER', filterBy })
//     }
// }