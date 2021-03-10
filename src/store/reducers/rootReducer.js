import { combineReducers, applyMiddleware } from 'redux'
import userReducer from './userReducer'

export default combineReducers({
    user: userReducer
})