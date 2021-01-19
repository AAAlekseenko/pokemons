import {GET_POKEMONS, SET_POKEMONS} from "./cardsConst";
import axios from "axios";


const initialState = {
    pokemons: [],
    isFetching: true,
};
const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                isFetching: false
            }
        case SET_POKEMONS:
            return {
                ...state,
                pokemons: [...state.pokemons, ...action.payload]
            }
        default:
            return state
    }
}

export default cardsReducer;

export function getPokemons(state) {
    return state.cards.pokemons || [];
}


export const setPokemonsAC = (value) => {
    return {
        type: SET_POKEMONS, payload: value
    }
}

export const getPokemonsAxios = () => (dispatch) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=30&offset=0`)
        .then(response => dispatch(setPokemonsAC(response.data.results)))
};

export const getNextPokemonsAxios = (offset) => (dispatch) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=30&offset=${offset}`)
        .then(response => dispatch(setPokemonsAC(response.data.results)))
}
