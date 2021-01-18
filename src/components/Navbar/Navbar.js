import React from 'react';
import s from './navbar.module.scss'
import {NavLink} from "react-router-dom";
import {CARDS_ROUTE, POKE_LIST_ROUTE, } from "../../utils/consts";

const Navbar = () => {
    return (
        <div className={s.container}>
            <NavLink to={CARDS_ROUTE} className={s.link} >Карточки</NavLink>
            <NavLink to={POKE_LIST_ROUTE} className={s.link}>Список покемонов</NavLink>
        </div>
    );
};

export default Navbar;