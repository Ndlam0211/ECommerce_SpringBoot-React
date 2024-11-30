import { createStore, combineReducers } from "redux";
import CartReducer from "./reducers/CartReducer"; 

const rootReducer = combineReducers({cart:CartReducer})
const store = createStore(rootReducer)

export default store