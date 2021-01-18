import React from 'react';
import {getNextPokemonsAxios, getPokemons, getPokemonsAxios} from "../../store/cards/cardsReducer";
import {connect} from "react-redux";
import s from "../Cards/cards.module.scss";
import {Link} from "react-router-dom";
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

class PokeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 20
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


    render() {
        return (
            <div className={s.container}>
                {this.props.pokemons.map((pokemon, index) =>
                    <Link key={index} className={s.card} to={
                        {
                            pathname: `/pokemonprofile/${index + 1}`,
                            state: pokemon
                        }
                    }>
                        <h2>{toUpperCase(pokemon.name)}</h2>
                    </Link>
                )}
                <div id={'anchor'} className={s.anchor}> Red лучшая часть</div>
            </div>
        );
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(PokeList);