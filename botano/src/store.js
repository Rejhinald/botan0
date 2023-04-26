 import { combineReducers, applyMiddleware } from "redux";
 import { legacy_createStore as createStore } from 'redux'
 import thunk from 'redux-thunk';
 import { composeWithDevTools } from "redux-devtools-extension";
 import { plantListReducer, plantDetailsReducer } from './reducers/plantReducers';
 import { userLoginReducer } from './reducers/userReducers'
import { orderSubscribe } from "./reducers/orderReducers";


 const reducer = combineReducers({
     plantList: plantListReducer,
     plantDetails: plantDetailsReducer,
     userLogin: userLoginReducer,
     orderSubscribe: orderSubscribe,
 })

 const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

 const intialState = {
    userLogin: {userInfo: userInfoFromStorage}
 }

 const middleware = [thunk]

 const store = createStore(reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)))

 export default store
