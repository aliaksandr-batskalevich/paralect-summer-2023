import React, {useEffect} from 'react';
import s from './Favorites.module.scss';
import {useAppDispatch} from "../../../utils/useAppDispatch.hook";
import {useSelector} from "react-redux";
import {
    getCountFavoritesOnPage,
    getFavoritesCurrentPage,
    getFavoritesIds,
    getFavoritesTotalPage,
    getFavoritesVacancies,
    getIsFavoritesFetching
} from "../../../bll/favorites.selector";
import {getFavoriteVacanciesTC, setCurrentFavoritesPage, setFavoritesVacancies} from "../../../bll/favorites.reducer";
import {Vacancies} from "../../commons/Vacancies/Vacancies";
import {useNavigate} from "react-router-dom";

export const Favorites = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isVacanciesFetching = useSelector(getIsFavoritesFetching);
    const currentPage = useSelector(getFavoritesCurrentPage);
    const countOnPage = useSelector(getCountFavoritesOnPage);
    const totalPage = useSelector(getFavoritesTotalPage);
    const vacancies = useSelector(getFavoritesVacancies);
    const favoritesIds = useSelector(getFavoritesIds);

    const setCurrentPageHandler = (currentPage: number) => {
        dispatch(setCurrentFavoritesPage(currentPage));
    };

    useEffect(() => {

        dispatch(getFavoriteVacanciesTC(favoritesIds, countOnPage, currentPage))
            .catch(reason => {
                const {status, message} = reason;
                navigate(`/error?status=${status}&message=${message}`);
            });

        return () => {
            dispatch(setFavoritesVacancies([]));
        }

    }, [
        dispatch,
        currentPage,
        countOnPage,
        // for update page after remove favorite
        favoritesIds
    ]);

    return (
        <div className={s.favoritesWrapper}>
            <Vacancies
                isVacanciesFetching={isVacanciesFetching}
                vacancies={vacancies}
                currentPage={currentPage}
                totalPage={totalPage}
                pageChange={setCurrentPageHandler}
            />
        </div>
    );
};