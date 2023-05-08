import React, {useEffect} from 'react';
import s from './Favorites.module.scss';
import {useAppDispatch} from "../../../utils/useAppDispatch.hook";
import {useSelector} from "react-redux";
import {
    getCountFavoritesOnPage,
    getFavoritesCurrentPage,
    getFavoritesTotalPage,
    getFavoritesVacancies,
    getIsFavoritesFetching
} from "../../../bll/favorites.selector";
import {
    getFavoriteVacanciesTC,
    setCurrentFavoritesPage,
    setFavoritesVacancies,
    setTotalFavoritesPage
} from "../../../bll/favorites.reducer";
import {Vacancies} from "../Search/Vacancies/Vacancies";

export const Favorites = () => {

    const dispatch = useAppDispatch();

    const isVacanciesFetching = useSelector(getIsFavoritesFetching);
    const currentPage = useSelector(getFavoritesCurrentPage);
    const countOnPage = useSelector(getCountFavoritesOnPage);
    const totalPage = useSelector(getFavoritesTotalPage);
    const vacancies = useSelector(getFavoritesVacancies);

    const setCurrentPageHandler = (currentPage: number) => {
        dispatch(setCurrentFavoritesPage(currentPage));
    };

    useEffect(() => {

        dispatch(getFavoriteVacanciesTC(countOnPage, currentPage));

        return () => {
            dispatch(setFavoritesVacancies([]));
        }

    }, [dispatch, currentPage, countOnPage])

    return (
        <div className={s.favoritesWrapper}>
            <Vacancies
                isVacanciesFetching={isVacanciesFetching}
                vacancies={vacancies}
                currentPage={currentPage}
                totalPage={totalPage}
                setCurrentPage={setCurrentPageHandler}
            />
        </div>
    );
};