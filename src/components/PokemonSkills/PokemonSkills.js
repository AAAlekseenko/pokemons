import React from 'react';
import s from './pokemonSkills.module.scss'
const PokemonSkills = (props) => {
    return (
        <div className={s.container}>
            {props.moves.map(move => <div key={move.move.name} className={s.skills__item}>
                    {move.move.name}
                </div>
            )}
        </div>
    );
};

export default PokemonSkills;