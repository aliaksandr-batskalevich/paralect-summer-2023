import {ThunkDispatchType} from "../utils/useAppDispatch.hook";
import {LocalStorageApi} from "../dal/localStorage.api";
import HttpsApi from "../dal/https.api";
import {VacancyType} from "../models/vacancies";
import {totalPageMaker} from "../utils/totalPage.function";
import {fetchErrorHandler} from "../utils/fetchErrorHandler.function";

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

// UTILS FOR SORT FAVORITES VACANCIES
const idsToFetchMaker = (idsArr: Array<number>, count: number, page: number): Array<number> => {
    const startIndex = (page - 1) * count;
    const endIndex = page * count;
    const fetchIds = idsArr.slice(startIndex, endIndex);
    
    return fetchIds;
};
const vacanciesSorter = (sample: Array<number>, vacancies: Array<VacancyType>): Array<VacancyType> => {
    const vacanciesSort = [] as Array<VacancyType>;
    for (let sampleId of sample) {
        const vacancy = vacancies.find(v => v.id === sampleId);
        vacancy && vacanciesSort.push(vacancy);
    }
    return vacanciesSort;
};

export const getFavoriteVacanciesTC = (favoritesIds: Array<number>, countOnPage: number, currentPage: number) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setIsFavoritesFetching(true));

        if (favoritesIds.length) {
            const totalPage = totalPageMaker(favoritesIds.length, countOnPage);
            dispatch(setTotalFavoritesPage(totalPage));
            if (currentPage > totalPage) currentPage = totalPage;
            
            const fetchIds = idsToFetchMaker(favoritesIds, countOnPage, currentPage);

            const response = await HttpsApi.getFavoriteVacancies(fetchIds, 4, 0);
            const favoritesFromServer = response.objects;

            const favoritesSort = vacanciesSorter(fetchIds, favoritesFromServer);

            dispatch(setFavoritesVacancies(favoritesSort));
        }

        dispatch(setIsFavoritesFetching(false));
    } catch (error) {
        const errorMessage = fetchErrorHandler(error);
        dispatch(setIsFavoritesFetching(false));
        return Promise.reject(errorMessage);
    }
};
