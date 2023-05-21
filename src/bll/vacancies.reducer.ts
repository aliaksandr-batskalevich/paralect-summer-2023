import {ThunkDispatchType} from "../utils/useAppDispatch.hook";
import HttpsApi from "../dal/https.api";
import {CataloguesResponseType} from "../models/catalogues.response";
import {VacancyType} from "../models/vacancies";
import {totalPageMaker} from "../utils/totalPage.function";
import {fetchErrorHandler} from "../utils/fetchErrorHandler.function";

export type VacanciesActionType = ReturnType<typeof setIsVacanciesInit>
    | ReturnType<typeof setIsVacanciesFetching>
    | ReturnType<typeof setIsVacancyFetching>
    | ReturnType<typeof setCatalogues>
    | ReturnType<typeof setTotalPage>
    | ReturnType<typeof setVacancies>
    | ReturnType<typeof setVacancy>;

type VacanciesStateType = {
    isInit: boolean
    isVacanciesFetching: boolean
    isVacancyFetching: boolean
    catalogues: CataloguesResponseType
    totalPage: number | null
    countOnPage: number
    vacancies: Array<VacancyType>
    vacancy: VacancyType | null
};

const vacanciesInitState: VacanciesStateType = {
    isInit: false,
    isVacanciesFetching: false,
    isVacancyFetching: false,
    catalogues: [],
    totalPage: null,
    countOnPage: 4,
    vacancies: [],
    vacancy: null,
};

export const vacanciesReducer = (state: VacanciesStateType = vacanciesInitState, action: VacanciesActionType): VacanciesStateType => {
    switch (action.type) {
        case "VACANCIES_SET_IS_VACANCIES_INIT":
            return {...state, ...action.payload};
        case "VACANCIES_SET_IS_VACANCIES_FETCHING":
            return {...state, ...action.payload};
        case "VACANCIES_SET_IS_VACANCY_FETCHING":
            return {...state, ...action.payload};
        case "VACANCIES_SET_CATALOGUES":
            return {...state, ...action.payload};
        case "VACANCIES_SET_TOTAL_PAGE":
            return {...state, ...action.payload};
        case "VACANCIES_SET_VACANCIES":
            return {...state, ...action.payload};
        case "VACANCIES_SET_VACANCY":
            return {...state, ...action.payload};
        default:
            return state;
    }
};

// ACTION CREATORS
export const setIsVacanciesInit = (isInit: boolean) => {
    return {
        type: 'VACANCIES_SET_IS_VACANCIES_INIT',
        payload: {isInit}
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
const setTotalPage = (totalPage: number | null) => {
    return {
        type: 'VACANCIES_SET_TOTAL_PAGE',
        payload: {totalPage}
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

// THUNK CREATORS
export const getCataloguesTC = () => async (dispatch: ThunkDispatchType) => {
    try {
        const catalogues = await HttpsApi.getCatalogues();
        dispatch(setCatalogues(catalogues));
    } catch (error) {
        let errorMessage = fetchErrorHandler(error);
        dispatch(setIsVacanciesFetching(false));
        return Promise.reject(errorMessage);
    }
};

export const getVacanciesTC = (
    catalogues: number | null,
    paymentFrom: number | null,
    paymentTo: number | null,
    keyword: string | null,
    page: number,
    count: number
) => async (dispatch: ThunkDispatchType) => {

    try {
        dispatch(setIsVacanciesFetching(true));

        const response = await HttpsApi.getVacancies(catalogues, paymentFrom, paymentTo, keyword, page, count);
        const totalResponse = response.total > 500 ? 500 : response.total;
        const totalPage = totalPageMaker(totalResponse, count);

        dispatch(setTotalPage(totalPage));
        dispatch(setVacancies(response.objects));
        dispatch(setIsVacanciesFetching(false));

    } catch (error) {
        let errorMessage = fetchErrorHandler(error);
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
        const errorMessage = fetchErrorHandler(error);
        dispatch(setIsVacancyFetching(false));
        return Promise.reject(errorMessage);
    }
};
