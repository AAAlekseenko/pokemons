import cardsReducer from "./cards/cardsReducer";
import {applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

const {createStore} = require("redux");
const {combineReducers} = require("redux");

const reducers = combineReducers({
    cards: cardsReducer,
})


export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))