import {
    AUTH_ERROR,
    AUTH_SUCCESS,
    FETCH_USER,
    SIGN_OUT,
    SIGN_UP,
    CLEAR_ERROR,
    FETCH_WATCHLIST,
    ADD_TO_WATCHLIST,
    REMOVE_FROM_WATCHLIST,
    EDIT_PROFILE
} from '../actionTypes';

const initialState = {
    currentUser: null,
    auth: {
        error: ''
    },
    watchlist: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return { ...state, auth: { error: '' } };
        case AUTH_ERROR:
            return { ...state, auth: { error: action.payload } };
        case SIGN_UP:
            return { ...state, currentUser: action.payload };
        case FETCH_USER:
            return { ...state, currentUser: action.payload };
        case CLEAR_ERROR:
            return { ...state, auth: { error: '' } };
        case FETCH_WATCHLIST:
            return { ...state, watchlist: action.payload };
        case ADD_TO_WATCHLIST:
            return { ...state, watchlist: [...state.watchlist, action.payload] }
        case REMOVE_FROM_WATCHLIST:
            return { ...state, watchlist: [...state.watchlist.filter(m => m.id !== action.payload)] }
        case EDIT_PROFILE:
            return { ...state, currentUser: action.payload };    
        case SIGN_OUT:
            return initialState;
        default:
            return state;
    }
}