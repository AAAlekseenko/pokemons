import React, {useState, useEffect} from 'react';
import {getNextPokemonsAxios, getPokemons, getPokemonsAxios} from "../../store/cards/cardsReducer";
import {connect} from "react-redux";
import s from '../Cards/cards-cardList.module.scss'
import {Link} from "react-router-dom";
import {toUpperCase} from "../../utils/function/toUpperCase";
import {InView} from 'react-intersection-observer';

const mapStateToProps = (state) => {
    return {
        pokemons: getPokemons(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPokemonsAxios: () => dispatch(getPokemonsAxios()),
        getNextPokemonsAxios: (offset) => dispatch(getNextPokemonsAxios(offset)),
    }
}


const PokeList = (props) => {

    const [offset, setOffset] = useState(30)
    useEffect(() => {
        return props.getPokemonsAxios();
    }, [])

    const getNewPokemons = async (offset) => {
        console.log(offset)
        return await props.getNextPokemonsAxios(offset);
    }

    return (
        <div className={s.wrapper} id={'wrapper'}>
            <div className={s.container} id={'container'}>
                {props.pokemons.map((pokemon, index) =>
                    <Link key={index} className={s.card} to={
                        {
                            pathname: `/pokemonprofile/${index + 1}`,
                            state: pokemon
                        }
                    }>
                        <h2>{toUpperCase(pokemon.name)}</h2>
                    </Link>
                )}
            </div>

            <InView as="div" initialInView={true} className={s.anchor} onChange={(inView, entry) => {
                getNewPokemons(offset).then(() => setOffset(offset + 30));
            }}>
                <h2>Red лучшая часть</h2>
            </InView>
        </div>
    );


}

export default connect(mapStateToProps, mapDispatchToProps)(PokeList);