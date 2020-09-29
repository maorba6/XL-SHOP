import httpService from './httpService'

export const itemService = {
    getItems,
    getEmptyItem,
    removeItem,
    saveItem,
    getItemById
}



// const items = [

// ]

async function getItems(filterBy = null) {
    if (!filterBy) {
        return await httpService.get(`item`)
    } else {
        const { type, category, name } = filterBy
        return await httpService.get('item' + `?type=${type}&category=${category}&name=${name}`)
    }

}



async function removeItem(id) {
    return await httpService.delete(`item/${id}`)
}

function sort(arr) {
    return arr
}

async function _updateItem(item) {
    return await httpService.put(`item/${item._id}`, item)
}


async function _addItem(item) {
    return await httpService.post(`item/`, item)
}

function saveItem(item) {
    return item._id ? _updateItem(item) : _addItem(item)
}

function getEmptyItem() {
    console.log('empty');
    return {
        type: '',
        price: '',
        category: '',
        brand: '',
        sizes: [],
        colors: [],
        imgUrls: []
    }
}


async function getItemById(id) {
    return await httpService.get(`item/${id}`)
}

