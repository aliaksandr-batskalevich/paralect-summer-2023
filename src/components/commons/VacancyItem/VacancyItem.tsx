import React from 'react';
import s from './VacancyItem.module.scss';
import {VacancyToListType} from "../../../models/vacancies";
import {paymentToRenderMaker} from "../../../utils/payment.functions";
import {NavLink} from "react-router-dom";

type VacancyItemPropsType = VacancyToListType & {
    isFavorite: boolean
    onClickFavorites: (id: number, isFavorite: boolean) => void
};

export const VacancyItem = (props: VacancyItemPropsType) => {

    const {
        id,
        profession,
        firm_name,
        townTitle,
        cataloguesTitle,
        workTypeTitle,
        payment_from,
        payment_to,
        currency,
        isFavorite,
        onClickFavorites
    } = props;


    const onClickFavoritesHandler = () => {
        onClickFavorites(id, isFavorite)
    };


    const paymentToRender = paymentToRenderMaker(payment_from, payment_to, currency);

    const favoriteClassName = isFavorite
        ? `${s.favoriteRoot} ${s.isFavorite}`
        : `${s.favoriteRoot} ${s.isNotFavorite}`;

    return (
        <div className={s.vacancyItemWrapper}>
            <NavLink to={`/search/${id}/`}>
                <h3>{`${profession} (${firm_name})`}</h3>
            </NavLink>
            <div className={s.description}>
                <p className={s.payment}>{paymentToRender}</p>
                <p className={s.workType}>{workTypeTitle}</p>
            </div>
            <div className={s.town}>{townTitle}</div>
            <div className={favoriteClassName} onClick={onClickFavoritesHandler}/>
        </div>
    );
};