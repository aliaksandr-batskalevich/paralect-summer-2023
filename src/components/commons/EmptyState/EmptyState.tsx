import React from 'react';
import s from './EmptyState.module.scss';
import './EmptyStateMantineStyles.scss';
import emptyLogo from '../../../assets/images/emptyLogo.png';
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "@mantine/core";

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
            && <div className={s.buttonWrapper}>
                <Button
                type='button'
                className='empty-state-button'
                onClick={goToSearchPageHandler}
            >
                Поиск Вакансий
            </Button></div>
            }
        </div>
    );
};