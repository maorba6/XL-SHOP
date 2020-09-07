export const itemService = {
    getItems,
    getEmptyItem,
    removeItem,
    saveItem,
    getItemById
}


const items = [
    {
        _id: "101",
        type: "shirt",
        color: "red" | "black",
        size: "XXL",
        imgUrl: "*****",
        category: "sport",
        brand: "adidas",
        price: 22,
        discount: 12,
        onStock: true / false
    },
    {
        _id: "102",
        type: "pants",
        color: "red" | "black",
        size: "XXL",
        imgUrl: "*****",
        category: "casual",
        brand: "nike",
        price: 17,
        discount: 12,
        onStock: true / false
    },
    {
        _id: "103",
        type: "shoes",
        color: "red",
        size: "44",
        imgUrl: "*****",
        category: "sport",
        brand: "nike",
        price: 76,
        discount: 12,
        onStock: true / false
    }

]

function getItems(filterBy = null) {
    return new Promise((resolve, reject) => {
        var itemsToReturn = items;

        resolve(sort(itemsToReturn))
    })
}


function removeItem(id) {
    return new Promise((resolve, reject) => {
        const index = items.findIndex(item => item._id === id)
        if (index !== -1) {
            items.splice(index, 1)
        }

        resolve(items)
    })
}



function sort(arr) {
    return arr
}

function _updateItem(item) {
    return new Promise((resolve, reject) => {
        const index = items.findIndex(c => item._id === c._id)
        if (index !== -1) {
            items[index] = item
        }
        resolve(item)
    })
}

function _addItem(item) {
    return new Promise((resolve, reject) => {
        item._id = _makeId()
        items.push(item)
        console.log('item:', item);
        resolve(item)
    })
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
        size: ''
    }
}


function getItemById(id) {
    return new Promise((resolve, reject) => {
        const item = items.find(item => item._id === id)
        item ? resolve(item) : reject(`item id ${id} not found!`)
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