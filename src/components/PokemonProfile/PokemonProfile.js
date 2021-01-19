import React from 'react';
import axios from "axios";
import s from './pokemonProfile.module.scss';
import defaultImg from "../../assets/img/pokeball.png";
import Loader from "../Loader/Loader";
import PokemonSkills from "./PokemonSkills/PokemonSkills";
import {toUpperCase} from "../../utils/function/toUpperCase";

class PokemonProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: {},
            loading: true,
        }
    }

    componentDidMount() {
        axios.get(this.props.location.state.url)
            .then(response => {
                this.setState({pokemon: response.data})
                this.setState({loading: false})
            })
    }


    handleImageErrored = (e) => {
        e.target.setAttribute("src", defaultImg);
    }

    render() {
        return (
            <>
                {this.state.loading
                    ? <div className={s.loader_container}><Loader/></div>
                    : <div className={s.container}>
                        <div className={s.pokemon__header}>
                            <div className={s.pokemon__logo}>
                                <h2 className={s.pokemon__name}>{toUpperCase(this.state.pokemon.name)}</h2>
                                <img
                                    id={this.state.pokemon.id}
                                    src={`https://pokeres.bastionbot.org/images/pokemon/${this.state.pokemon.id}.png`}
                                    onError={this.handleImageErrored}
                                    className={s.img}
                                    alt={'Кто украл покемона?'}
                                />
                            </div>
                            <div className={s.pokemon__description} >
                                <div>Рост покемона {this.state.pokemon.height}</div>
                                <div>Вес покемона {this.state.pokemon.weight}</div>

                                <div>
                                    Тип Покемона
                                    {this.state.pokemon.types.map(type => {
                                        return <div>{toUpperCase(type.type.name)}</div>
                                    })}
                                </div>

                                <div>Особые
                                    {this.state.pokemon.abilities.map(skill => {
                                        return <div className={s.ability} key={skill.ability.name}>
                                            <div>Название способности: {toUpperCase(skill.ability.name)}</div>
                                            <div>Cлот: {skill.slot}</div>
                                        </div>
                                    })}
                                </div>
                                <div>Базовый опыт {this.state.pokemon.base_experience}</div>
                            </div>
                        </div>
                        <div className={s.skills}>Все способности
                            <PokemonSkills moves={this.state.pokemon.moves}/>
                        </div>


                    </div>}
            </>
        )
    }


}

export default PokemonProfile;