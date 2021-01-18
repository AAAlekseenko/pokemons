import React from 'react';
import {
    getNextPokemonsAxios,
    getPokemons,
    getPokemonsAxios,
} from "../../store/cards/cardsReducer";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import s from './cards.module.scss';
import defaultImg from '../../utils/img/pokeball.png';
import {toUpperCase} from "../../utils/function/toUpperCase";

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

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 20,
        }
    }


    componentDidMount() {
        this.props.getPokemonsAxios();
        const observer = new IntersectionObserver(() => {
                this.props.getNextPokemonsAxios(this.state.offset);
                this.setState({offset: this.state.offset + 20})
            },

            {
                root: null
            });

        observer.observe(document.getElementById('anchor'));
    }

    handleImageErrored = (e) => {
       return  e.target.setAttribute("src", defaultImg);
    }

    render() {
        return (
            <div className={s.wrapper}>
                <div className={s.container}>
                    {this.props.pokemons.map((pokemon, index) =>
                        <Link key={index} className={s.card} to={
                            {
                                pathname: `/pokemonprofile/${index + 1}`,
                                state: pokemon
                            }
                        }>
                            <h2>{toUpperCase(pokemon.name)}</h2>
                            <img
                                id={index + 1}
                                src={`https://pokeres.bastionbot.org/images/pokemon/${index + 1}.png`}
                                onError={this.handleImageErrored}
                                className={s.img}
                            alt={'Кто украл покемона'}
                            />
                        </Link>
                    )}

                </div>
                <div id={'anchor'} className={s.anchor}> Red лучшая часть</div>
            </div>

        );
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);


