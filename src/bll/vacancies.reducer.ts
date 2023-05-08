import {ThunkDispatchType} from "../utils/useAppDispatch.hook";
import axios from "axios";
import {HttpsApi} from "../dal/https.api";
import {CataloguesResponseType} from "../models/catalogues.response";
import {VacancyType} from "../models/vacancies";
import {totalPageMaker} from "../utils/totalPage.function";

export type VacanciesActionType = ReturnType<typeof setIsVacanciesInit>
    | ReturnType<typeof setIsSearchParamsInit>
    | ReturnType<typeof setIsVacanciesFetching>
    | ReturnType<typeof setIsVacancyFetching>
    | ReturnType<typeof setCatalogues>
    | ReturnType<typeof setCurrentFilter>
    | ReturnType<typeof setKeyword>
    | ReturnType<typeof setTotalPage>
    | ReturnType<typeof setSearchCurrentPage>
    | ReturnType<typeof setVacancies>
    | ReturnType<typeof setVacancy>;

export type FilterType = {
    branchKey: number | null
    paymentFrom: number | null
    paymentTo: number | null
};

type VacanciesStateType = {
    isInit: boolean
    isSearchParamsInit: boolean
    isVacanciesFetching: boolean
    isVacancyFetching: boolean
    catalogues: CataloguesResponseType
    currentFilter: FilterType
    keyword: string | null
    totalPage: number | null
    currentPage: number
    countOnPage: number
    vacancies: Array<VacancyType>
    vacancy: VacancyType | null
};

const vacanciesInitState: VacanciesStateType = {
    isInit: false,
    isSearchParamsInit: false,
    isVacanciesFetching: false,
    isVacancyFetching: false,
    catalogues: [],
    currentFilter: {
        branchKey: null,
        paymentFrom: null,
        paymentTo: null,
    },
    keyword: null,
    totalPage: null,
    currentPage: 1,
    countOnPage: 4,
    vacancies: [],
    vacancy: null,
};

export const vacanciesReducer = (state: VacanciesStateType = vacanciesInitState, action: VacanciesActionType): VacanciesStateType => {
    switch (action.type) {
        case "VACANCIES_SET_IS_VACANCIES_INIT":
            return {...state, ...action.payload};
        case "VACANCIES_SET_IS_SEARCH_PARAMS_INIT":
            return {...state, ...action.payload};
        case "VACANCIES_SET_IS_VACANCIES_FETCHING":
            return {...state, ...action.payload};
        case "VACANCIES_SET_IS_VACANCY_FETCHING":
            return {...state, ...action.payload};
        case "VACANCIES_SET_CATALOGUES":
            return {...state, ...action.payload};
        case "VACANCIES_SET_CURRENT_FILTER":
            return {...state, currentFilter: action.payload};
        case "VACANCIES_SET_KEYWORD":
            return {...state, ...action.payload};
        case "VACANCIES_SET_TOTAL_PAGE":
            return {...state, ...action.payload};
        case "VACANCIES_SET_CURRENT_PAGE":
            return {...state, ...action.payload};
        case "VACANCIES_SET_VACANCIES":
            return {...state, ...action.payload};
        case "VACANCIES_SET_VACANCY":
            return {...state, ...action.payload};
        default:
            return state;
    }
};
export const setIsVacanciesInit = (isInit: boolean) => {
    return {
        type: 'VACANCIES_SET_IS_VACANCIES_INIT',
        payload: {isInit}
    } as const;
};
export const setIsSearchParamsInit = (isSearchParamsInit: boolean) => {
    return {
        type: 'VACANCIES_SET_IS_SEARCH_PARAMS_INIT',
        payload: {isSearchParamsInit}
    } as const;
};
const setIsVacanciesFetching = (isVacanciesFetching: boolean) => {
    return {
        type: 'VACANCIES_SET_IS_VACANCIES_FETCHING',
        payload: {isVacanciesFetching}
    } as const;
};
const setIsVacancyFetching = (isVacancyFetching: boolean) => {
    return {
        type: 'VACANCIES_SET_IS_VACANCY_FETCHING',
        payload: {isVacancyFetching}
    } as const;
};
const setCatalogues = (catalogues: CataloguesResponseType) => {
    return {
        type: 'VACANCIES_SET_CATALOGUES',
        payload: {catalogues}
    } as const;
};
export const setCurrentFilter = (branchKey: null | number, paymentFrom: null | number, paymentTo: null | number) => {
    return {
        type: 'VACANCIES_SET_CURRENT_FILTER',
        payload: {branchKey, paymentFrom, paymentTo}
    } as const;
};
export const setKeyword = (keyword: string | null) => {
    return {
        type: 'VACANCIES_SET_KEYWORD',
        payload: {keyword}
    } as const;
};
const setTotalPage = (totalPage: number | null) => {
    return {
        type: 'VACANCIES_SET_TOTAL_PAGE',
        payload: {totalPage}
    } as const;
};
export const setSearchCurrentPage = (currentPage: number) => {
    return {
        type: 'VACANCIES_SET_CURRENT_PAGE',
        payload: {currentPage}
    } as const;
};
const setVacancies = (vacancies: Array<VacancyType>) => {
    return {
        type: 'VACANCIES_SET_VACANCIES',
        payload: {vacancies}
    } as const;
};
export const setVacancy = (vacancy: VacancyType | null) => {
    return {
        type: 'VACANCIES_SET_VACANCY',
        payload: {vacancy}
    } as const;
};


export const getCataloguesTC = () => async (dispatch: ThunkDispatchType) => {
    try {
        const catalogues = await HttpsApi.getCatalogues();
        dispatch(setCatalogues(catalogues));
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
        dispatch(setIsVacanciesFetching(false));
        return Promise.reject(errorMessage);
    }
};

export const getVacanciesTC = (catalogues: number | null, paymentFrom: number | null, paymentTo: number | null, keyword: string | null, page: number, count: number) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setIsVacanciesFetching(true));
        const response = await HttpsApi.getVacancies(catalogues, paymentFrom, paymentTo, keyword, page, count);
        const totalResponse = response.total > 500 ? 500 : response.total;
        const totalPage = totalPageMaker(totalResponse, count);
        dispatch(setTotalPage(totalPage));
        dispatch(setVacancies(response.objects));
        dispatch(setIsVacanciesFetching(false));
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
        dispatch(setIsVacanciesFetching(false));
        return Promise.reject(errorMessage);
    }
};

export const getVacancyTC = (id: number) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setIsVacancyFetching(true));
        const vacancy = await HttpsApi.getVacancy(id);
        dispatch(setVacancy(vacancy));
        dispatch(setIsVacancyFetching(false));
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
        dispatch(setIsVacancyFetching(false));
        return Promise.reject(errorMessage);
    }
};
