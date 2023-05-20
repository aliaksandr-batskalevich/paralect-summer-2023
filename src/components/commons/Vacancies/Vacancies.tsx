import React from 'react';
import s from './Vacancies.module.scss';
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../utils/useAppDispatch.hook";
import {Preloader} from "../Preloader/Preloader";
import {VacancyItem} from "../VacancyItem/VacancyItem";
import {getFavoritesIds} from "../../../bll/favorites.selector";
import {addFavoriteVacancyTC, removeFavoriteVacancyTC} from "../../../bll/favorites.reducer";
import {VacancyToListType} from "../../../models/vacancies";
import {EmptyState} from "../EmptyState/EmptyState";
import {Pagination} from "@mantine/core";

type VacanciesPropsType = {
    isVacanciesFetching: boolean
    vacancies: Array<VacancyToListType>

    currentPage: number
    totalPage: number | null

    pageChange: (page: number) => void
}

export const Vacancies: React.FC<VacanciesPropsType> = ({
                                                            isVacanciesFetching,
                                                            vacancies,
                                                            currentPage,
                                                            totalPage,
                                                            pageChange,
                                                        }) => {

    const dispatch = useAppDispatch();

    const favoritesVacancies = useSelector(getFavoritesIds);

    const onClickFavoritesHandler = (id: number, isFavorite: boolean) => {
        isFavorite
            ? dispatch(removeFavoriteVacancyTC(id))
            : dispatch(addFavoriteVacancyTC(id));
    };

    const vacanciesToRender = vacancies.map(vacancy => {
        const isFavorite = favoritesVacancies.includes(vacancy.id);

        return <VacancyItem
            {...vacancy}
            key={vacancy.id}
            onClickFavorites={onClickFavoritesHandler}
            isFavorite={isFavorite}
        />
    });

    return (
        <div className={s.vacanciesWrapper}>
            {isVacanciesFetching
                ? <Preloader/>
                : vacancies.length
                    ? <div>{vacanciesToRender}</div>
                    : <EmptyState/>}
            {!!totalPage && !!vacancies.length && <Pagination
                className={s.pagination}
                siblings={2}
                total={totalPage}
                value={currentPage}
                onChange={pageChange}
                disabled={isVacanciesFetching}
            />}
        </div>
    );
};