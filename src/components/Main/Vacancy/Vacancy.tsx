import React, {useEffect} from 'react';
import s from './Vacancy.module.scss';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "../../../utils/useAppDispatch.hook";
import {useSelector} from "react-redux";
import {getIsVacancyFetching, getVacancyWithDetail} from "../../../bll/vacancies.selector";
import {getVacancyTC, setVacancy} from "../../../bll/vacancies.reducer";
import {Preloader} from "../../commons/Preloader/Preloader";
import {VacancyItem} from "../../commons/VacancyItem/VacancyItem";
import {getFavoritesIds} from "../../../bll/favorites.selector";
import {addFavoriteVacancyTC, removeFavoriteVacancyTC} from "../../../bll/favorites.reducer";
import {VacancyDetail} from "./VacancyDetail/VacancyDetail";

export const Vacancy = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const {id} = useParams<{ id: string }>();
    const isVacancyFetching = useSelector(getIsVacancyFetching);
    const vacancy = useSelector(getVacancyWithDetail);
    const favorites = useSelector(getFavoritesIds);

    const isFavorite = vacancy && favorites.includes(vacancy.vacancyToList.id);

    const onClickFavoritesHandler = (id: number, isFavorite: boolean) => {
        isFavorite
            ? dispatch(removeFavoriteVacancyTC(id))
            : dispatch(addFavoriteVacancyTC(id));
    };

    useEffect(() => {

        dispatch(getVacancyTC(+id!))
            .catch(reason => {
                navigate(`/404?message=${reason}`);
            });

        return () => {
            dispatch(setVacancy(null));
        }

    }, [dispatch, id]);

    return (
        isVacancyFetching
            ? <Preloader/>
            : <div className={s.vacancyWrapper}>
                {vacancy && <>
                    <VacancyItem
                    {...vacancy.vacancyToList}
                    isFavorite={isFavorite!}
                    onClickFavorites={onClickFavoritesHandler}
                />
                    <VacancyDetail
                        {...vacancy.detail}
                    />
                </>}
            </div>
    );
};