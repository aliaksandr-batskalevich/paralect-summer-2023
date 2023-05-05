import React from 'react';
import s from './Header.module.scss';
import {Logo} from "../commons/Logo/Logo";
import {Navigation} from "./Navigation/Navigation";

type HeaderPropsType = {
    isAuth: boolean
};

export const Header: React.FC<HeaderPropsType> = ({isAuth}) => {
    return (
        <div className={s.headerWrapper}>
            <div className='container'>
                <div className={s.flexWrapper}>
                    <Logo />
                    {isAuth && <Navigation />}
                </div>
            </div>
        </div>
    );
};