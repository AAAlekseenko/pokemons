import PokeList from "../pages/PokeList/PokeList";
import PokemonProfile from "../pages/PokemonProfile/PokemonProfile";
import {CARDS_ROUTE, POKE_LIST_ROUTE, POKE_PROFILE_ROUTE} from "./consts";
import Cards from "../pages/Cards/Cards";

export const AllRoutes = [
    {
        path: POKE_LIST_ROUTE,
        Component: PokeList
    },
    {
        path: CARDS_ROUTE,
        Component: Cards
    },
    {
        path: POKE_PROFILE_ROUTE,
        Component: PokemonProfile
    }
]

