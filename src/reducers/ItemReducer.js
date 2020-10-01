const INITIAL_STATE = {
    items: null,
    filterBy: null,
    currItem: null,
    sameCategoryItems:[]
}

export function ItemReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case 'SET_ITEMS':
            // state.items = action.items
            // console.log({ state });
            // return { ...state }
            return {
                ...state,
                items: action.items
            }
        case 'SET_ITEM':
            return {
                ...state,
                currItem: action.item
            }
        case 'SET_SAME_CATEGORY_ITEMS':
            console.log(action);
            return {
                ...state,
                sameCategoryItems: action.items
            }
        case 'SET_FILTER':
            // state.filterBy = action.filterBy
            // return { ...state }
            return {
                ...state,
                filterBy: action.filterBy
            }
        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, action.item]
            }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.id)
            }
        case 'UPDATE_ITEM':
            return {
                ...state,
                items: state.items.map(item => item._id === action.item._id ? action.item : item)
            }
        default:
            return state
    }

}