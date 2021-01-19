import {GET_POKEMONS, SET_POKEMONS} from "./const";


const initialState = {
    pokemons: [],
    isFetching: true,
};
const reducer = (state = initialState, action) => {
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

export default reducer;

