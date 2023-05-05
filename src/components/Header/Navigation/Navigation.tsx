import React from 'react';
import {NavLink} from "react-router-dom";
import s from './Navigation.module.scss';

export const Navigation = () => {
    return (
        <div className={s.navigationWrapper}>
           <NavLink to='/search' className={({isActive}) => isActive ? s.isActive : ''}>Поиск вакансий</NavLink>
           <NavLink to='/favorites' className={({isActive}) => isActive ? s.isActive : ''}>Избранное</NavLink>
        </div>
    );
};