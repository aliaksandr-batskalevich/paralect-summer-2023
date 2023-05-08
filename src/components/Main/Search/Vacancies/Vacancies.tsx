import React from 'react';
import s from './Vacancies.module.scss';
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../../utils/useAppDispatch.hook";
import {Preloader} from "../../../commons/Preloader/Preloader";
import {VacancyItem} from "../../../commons/VacancyItem/VacancyItem";
import {getFavoritesIds} from "../../../../bll/favorites.selector";
import {addFavoriteVacancyTC, removeFavoriteVacancyTC} from "../../../../bll/favorites.reducer";
import {VacancyToListType} from "../../../../models/vacancies";
import {EmptyState} from "../../../commons/EmptyState/EmptyState";
import {Pagination} from "@mantine/core";

type VacanciesPropsType = {
    isVacanciesFetching: boolean
    vacancies: Array<VacancyToListType>

    currentPage: number
    totalPage: number | null
    setCurrentPage: (currentPage: number) => void
}

export const Vacancies: React.FC<VacanciesPropsType> = ({
                                                            isVacanciesFetching,
                                                            vacancies,
                                                            currentPage,
                                                            totalPage,
                                                            setCurrentPage,
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

    console.log(totalPage);

    return (
        <div className={s.vacanciesWrapper}>
            {isVacanciesFetching
                ? <Preloader/>
                : vacancies.length
                    ? <div>{vacanciesToRender}</div>
                    : <EmptyState/>}
            {!!totalPage && <Pagination
                className={s.pagination}
                siblings={2}
                total={totalPage}
                value={currentPage}
                onChange={setCurrentPage}
                disabled={isVacanciesFetching}
            />}
        </div>
    );
};