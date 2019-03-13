const initialState = {
    type: 'asd',
};

export function pageReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ROOM_TYPE':
            return { ...state, type: action.payload }

        default:
            return state
    }
}