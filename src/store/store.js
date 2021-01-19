import reducer from "./cards/reducer";
import {applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

const {createStore} = require("redux");
const {combineReducers} = require("redux");

const reducers = combineReducers({
    cards: reducer,
})


export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))