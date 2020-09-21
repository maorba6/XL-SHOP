import httpService from './httpService'

export const itemService = {
    getItems,
    getEmptyItem,
    removeItem,
    saveItem,
    getItemById
}



const items = [
    {
        type: "shirt",
        colors: ["black"],
        sizes: ["XXL", 'XL', 'S'],
        imgUrl: 'https://rohan.imgix.net/product/05325N68.jpg?w=2500&auto=format&q=77',
        category: "sport",
        brand: "adidas",
        price: 22,
        discount: 12,
        onStock: true
    },
    {
        type: "shirt",
        colors: ["black", 'red'],
        sizes: ["XXL", 'XL', 'S'],
        imgUrl: "https://rohan.imgix.net/product/05325N68.jpg?w=2500&auto=format&q=77",
        category: "sport",
        brand: "adidas",
        price: 5,
        discount: 16,
        onStock: true
    },
    {
        type: "shirt",
        colors: ["green", 'red'],
        sizes: ["L", 'XL'],
        imgUrl: "https://rohan.imgix.net/product/05325N68.jpg?w=2500&auto=format&q=77",
        category: "sport",
        brand: "nike",
        price: 55,
        discount: 14,
        onStock: true / false
    },
    {
        type: "pants",
        colors: ["black", 'red'],
        sizes: ["XXL", 'XL', 'S'],
        imgUrl: "https://cdn11.bigcommerce.com/s-qb5zncdqc6/images/stencil/2048x2048/products/5840/11417/womenssimplepantsblack__49371.1578586139.jpg?c=2",
        category: "casual",
        brand: "nike",
        price: 17,
        discount: 12,
        onStock: true
    },
    {
        type: "shoes",
        colors: ["black", 'yellow'],
        sizes: ["XXL", 'XL', 'S'],
        imgUrl: "https://images-na.ssl-images-amazon.com/images/I/61Ez19M9BZL._AC_UY1000_.jpg",
        category: "sport",
        brand: "nike",
        price: 87,
        discount: 17,
        onStock: true
    },
    {
        type: "shoes",
        colors: ["black", 'red', 'green'],
        sizes: [44, 42, 40],
        imgUrl: "https://images-na.ssl-images-amazon.com/images/I/61Ez19M9BZL._AC_UY1000_.jpg",
        category: "sport",
        brand: "nike",
        price: 52,
        discount: 3,
        onStock: true
    },
    {
        type: "shoes",
        colors: ["black", 'white'],
        sizes: [44, 42, 40],
        imgUrl: "https://images-na.ssl-images-amazon.com/images/I/61Ez19M9BZL._AC_UY1000_.jpg",
        category: "casual",
        brand: "adidas",
        price: 24,
        discount: 11,
        onStock: false
    }

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
    return await httpService.put(`item/${item._id}`, item)
}


async function _addItem(item) {
    items.push(item)
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

