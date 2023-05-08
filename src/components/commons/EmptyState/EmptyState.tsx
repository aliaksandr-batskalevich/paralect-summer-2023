import React from 'react';
import s from './EmptyState.module.scss';
import emptyLogo from '../../../assets/images/emptyLogo.png';
import {useLocation, useNavigate} from "react-router-dom";

export const EmptyState = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const goToSearchPageHandler = () => {
        navigate('/search');
    };

    const title = location.pathname === '/search'
        ? 'Упс, по Вашему запросу ничего не найдено!'
        : 'Упс, здесь еще ничего нет!';

    return (
        <div className={s.emptyStateWrapper}>
            <div className={s.logoWrapper}>
                <img src={emptyLogo} alt="emptyLogo"/>
            </div>
            <h2>{title}</h2>
            {location.pathname !== '/search'
            && <button onClick={goToSearchPageHandler}>Поиск Вакансий</button>}
        </div>
    );
};