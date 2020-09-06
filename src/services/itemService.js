export const itemService = {
    getItems,
}


const items = [
    {
        type: "shirt",
        color: "red" | "black",
        size: "XXL",
        imgUrl: "*****",
        category: "sport",
        brand: "adidas",
        price: 15,
        discount: 12,
        onStock: true / false
    },
    {
        type: "pants",
        color: "red" | "black",
        size: "XXL",
        imgUrl: "*****",
        category: "casual",
        brand: "nike",
        price: 15,
        discount: 12,
        onStock: true / false
    },
    {
        type: "shoes",
        color: "red",
        size: "44",
        imgUrl: "*****",
        category: "sport",
        brand: "nike",
        price: 15,
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




function sort(arr) {
    return arr
}
