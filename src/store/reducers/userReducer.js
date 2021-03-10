import { AUTH_ERROR, AUTH_SUCCESS, FETCH_USER, SIGN_OUT, SIGN_UP } from '../actionTypes';

const initialState = {
    currentUser: {},
    auth: {
        error: ''
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state, auth: { error: '' }};
        case AUTH_ERROR:
            return {...state, auth: { error: action.payload }};
        case SIGN_UP:
            return {...state, currentUser: action.payload};
        case FETCH_USER:
            return {...state, currentUser: action.payload};
        case SIGN_OUT:
            return initialState;
        default:
            return state;
    }
}