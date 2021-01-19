import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import s from './cards-cardList.module.scss';
import defaultImg from '../../assets/img/pokeball.png';
import {InView} from "react-intersection-observer";
import {getPokemons} from "../../store/cards/getters";
import {getNextPokemonsAxios, getPokemonsAxios} from "../../store/cards/action";

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

const Cards = (props) => {
    const [offset, setOffset] = useState(30)
    useEffect(() => {
        return props.getPokemonsAxios();
    }, [])

    const getNewPokemons = async (offset) => {
        return await props.getNextPokemonsAxios(offset);
    }
    const handleImageErrored = (e) => {
       return  e.target.setAttribute("src", defaultImg);
    }
        return (
            <div className={s.wrapper}>
                <div className={s.container}>
                    {props.pokemons.map((pokemon, index) =>
                        <Link key={index} className={s.card} to={
                            {
                                pathname: `/pokemonprofile/${index + 1}`,
                                state: pokemon
                            }
                        }>
                            <h2>{pokemon.name}</h2>
                            <img
                                id={index + 1}
                                src={`https://pokeres.bastionbot.org/images/pokemon/${index + 1}.png`}
                                onError={handleImageErrored}
                                className={s.img}
                            alt={'Кто украл покемона'}
                            />
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

export default connect(mapStateToProps, mapDispatchToProps)(Cards);


