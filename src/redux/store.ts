import {combineReducers, createStore} from 'redux'
import GeneralReducer from "./reducers/GeneralReducer";

export default createStore(combineReducers({
    general: GeneralReducer,
}))