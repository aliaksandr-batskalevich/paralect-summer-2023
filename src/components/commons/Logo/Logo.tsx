import React from 'react';
import s from './Logo.module.scss';
import {NavLink} from "react-router-dom";

export const Logo = () => {
    return (
        <NavLink to='/'>
            <div className={s.logoWrapper}>
                <div className={s.crossesWrapper}>
                    <div/>
                    <div/>
                </div>
                <h1 className={s.logoTitle}>Jobored</h1>
            </div>
        </NavLink>

    );
};