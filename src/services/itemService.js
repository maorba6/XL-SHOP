import httpService from './httpService'

export const itemService = {
    getItems,
    getEmptyItem,
    removeItem,
    saveItem,
    getItemById
}



const items = [

]

async function getItems(filterBy = null) {

    return await httpService.get(`item`)

}

async function removeItem(id) {
    const index = items.findIndex(item => item._id === id)
    if (index !== -1) {
        items.splice(index, 1)
    }
    return await httpService.delete(`item/${id}`)

}

function sort(arr) {
    return arr
}

async function _updateItem(item) {
    const index = items.findIndex(c => item._id === c._id)
    if (index !== -1) {
        items[index] = item
    }
    console.log('colors:', item);
    return await httpService.put(`item/${item._id}`, item)
}


async function _addItem(item) {
    // items.push(item)
    return await httpService.post(`item/`, item)

}

function saveItem(item) {
    return item._id ? _updateItem(item) : _addItem(item)
}

function getEmptyItem() {
    return {
        type: '',
        price: '',
        category: '',
        brand: '',
        sizes: [],
        colors: []
    }
}


async function getItemById(id) {

    // const item = items.find(item => item._id === id)
    // item ? resolve(item) : reject(`item id ${id} not found!`)
    return await httpService.get(`item/${id}`)
}

