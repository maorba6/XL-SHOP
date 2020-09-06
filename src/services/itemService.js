export const itemService = {
    getItems,
    removeItem
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
