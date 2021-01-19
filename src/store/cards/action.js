import {SET_POKEMONS} from "./const";
import axios from "axios";

export const setPokemons = (value) => {
    return {
        type: SET_POKEMONS, payload: value
    }
}


export const getPokemonsAxios = () => (dispatch) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=30&offset=0`)
        .then(response => dispatch(setPokemons(response.data.results)))
};

export const getNextPokemonsAxios = (offset) => (dispatch) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=30&offset=${offset}`)
        .then(response => dispatch(setPokemons(response.data.results)))
}
