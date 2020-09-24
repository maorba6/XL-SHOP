const INITIAL_STATE = {
    items: null,
    filterBy: null,
    currItem: null
}

export function ItemReducer(state = INITIAL_STATE, action) {
    console.log({ action });
    switch (action.type) {
        case 'SET_ITEMS':
            return {
                ...state,
                items: action.items
            }
        case 'SET_ITEM':
            return {
                ...state,
                currItem: action.item
            }
        case 'SET_FILTER':
            console.log('actions:', action.filterBy);
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