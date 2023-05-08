import {RootStateType} from "./store";
import {VacancyToListType, VacancyType} from "../models/vacancies";
import {createSelector} from "reselect";
import {vacancyToListMaker} from "../utils/vacancy.functions";


export const getIsFavoritesFetching = (state: RootStateType): boolean => state.favorites.isFavoritesFetching;
export const getFavoritesIds = (state: RootStateType): Array<number> => state.favorites.favorites;
const getFavoritesVacanciesFull = (state: RootStateType): Array<VacancyType> => state.favorites.favoritesVacancies;
export const getCountFavoritesOnPage = (state: RootStateType): number => state.favorites.countOnPage;
export const getFavoritesCurrentPage = (state: RootStateType): number => state.favorites.currentPage;
export const getFavoritesTotalPage = (state: RootStateType): number | null => state.favorites.totalPage;


// SELECTORS by RESELECT
export const getFavoritesVacancies = createSelector(getFavoritesVacanciesFull, (vacancies: Array<VacancyType>): Array<VacancyToListType> => vacancies.map(vacancyToListMaker));