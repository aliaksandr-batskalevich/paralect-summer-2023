import {ThunkDispatchType} from "../utils/useAppDispatch.hook";
import {LocalStorageApi} from "../dal/localStorage.api";
import {HttpsApi} from "../dal/https.api";
import axios from "axios";
import {VacancyType} from "../models/vacancies";
import {totalPageMaker} from "../utils/totalPage.function";

export type FavoritesActionType = ReturnType<typeof setFavorites>
    | ReturnType<typeof setIsFavoritesFetching>
    | ReturnType<typeof setFavoritesVacancies>
    | ReturnType<typeof setCurrentFavoritesPage>
    | ReturnType<typeof setTotalFavoritesPage>;

type FavoritesStateType = {
    isFavoritesFetching: boolean
    favorites: Array<number>
    favoritesVacancies: Array<VacancyType>
    countOnPage: number
    currentPage: number
    totalPage: number | null
};

const favoritesInitState: FavoritesStateType = {
    isFavoritesFetching: false,
    favorites: [],
    favoritesVacancies: [],
    countOnPage: 4,
    currentPage: 1,
    totalPage: null,
};

export const favoritesReducer = (state: FavoritesStateType = favoritesInitState, action: FavoritesActionType): FavoritesStateType => {
    switch (action.type) {
        case "FAVORITES_SET_IS_FAVORITES_FETCHING":
            return {...state, ...action.payload};
        case "FAVORITES_SET_FAVORITES":
            return {...state, ...action.payload};
        case "FAVORITES_SET_FAVORITES_VACANCIES":
            return {...state, ...action.payload};
        case "FAVORITES_SET_CURRENT_PAGE":
            return {...state, ...action.payload};
        case "FAVORITES_SET_TOTAL_PAGE":
            return {...state, ...action.payload};
        default:
            return state;
    }
};
const setIsFavoritesFetching = (isFavoritesFetching: boolean) => {
    return {
        type: 'FAVORITES_SET_IS_FAVORITES_FETCHING',
        payload: {isFavoritesFetching}
    } as const;
};
const setFavorites = (favorites: Array<number>) => {
    return {
        type: 'FAVORITES_SET_FAVORITES',
        payload: {favorites}
    } as const;
};
export const setFavoritesVacancies = (favoritesVacancies: Array<VacancyType>) => {
    return {
        type: 'FAVORITES_SET_FAVORITES_VACANCIES',
        payload: {favoritesVacancies}
    } as const;
};
export const setCurrentFavoritesPage = (currentPage: number) => {
    return {
        type: 'FAVORITES_SET_CURRENT_PAGE',
        payload: {currentPage}
    } as const;
};
export const setTotalFavoritesPage = (totalPage: number | null) => {
    return {
        type: 'FAVORITES_SET_TOTAL_PAGE',
        payload: {totalPage}
    } as const;
};

export const initFavoriteVacancyTC = () => (dispatch: ThunkDispatchType) => {
    const favoritesVacancies = LocalStorageApi.getFavoritesVacancies();
    dispatch(setFavorites(favoritesVacancies));
};
export const addFavoriteVacancyTC = (id: number) => (dispatch: ThunkDispatchType) => {
    const favoritesVacancies = LocalStorageApi.addFavoriteVacancy(id);
    dispatch(setFavorites(favoritesVacancies));
};
export const removeFavoriteVacancyTC = (id: number) => (dispatch: ThunkDispatchType) => {
    const updatedFavoritesVacancies = LocalStorageApi.removeFavoriteVacancy(id);
    dispatch(setFavorites(updatedFavoritesVacancies));
};

export const getFavoriteVacanciesTC = (countOnPage: number, currentPage: number) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setIsFavoritesFetching(true));
        const ids = LocalStorageApi.getFavoritesVacancies();

        if (ids.length) {
            const response = await HttpsApi.getFavoriteVacancies(ids, countOnPage, currentPage);
            const totalPage = totalPageMaker(ids.length, countOnPage);
            dispatch(setTotalFavoritesPage(totalPage));
            dispatch(setFavoritesVacancies(response.objects));
        }

        dispatch(setIsFavoritesFetching(false));
    } catch (error) {
        let errorMessage: string;
        if (axios.isAxiosError(error)) {
            errorMessage = error.response
                ? error.response.data.error.message
                : error.message;

        } else {
            //@ts-ignore
            errorMessage = error.message;
        }
        console.log(errorMessage);
        dispatch(setIsFavoritesFetching(false));
        return Promise.reject(errorMessage);
    }
};
