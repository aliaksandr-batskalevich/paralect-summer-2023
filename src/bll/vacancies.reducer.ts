import {ThunkDispatchType} from "../utils/useAppDispatch.hook";
import axios from "axios";
import {HttpsApi} from "../dal/https.api";
import {CataloguesResponseType} from "../models/catalogues.request";

export type VacanciesActionType = ReturnType<typeof setIsFetching>
    | ReturnType<typeof setCatalogues>;

type VacanciesStateType = {
    isFetching: boolean
    catalogues: CataloguesResponseType
};

const vacanciesInitState: VacanciesStateType = {
    isFetching: false,
    catalogues: [],
};

export const vacanciesReducer = (state: VacanciesStateType = vacanciesInitState, action: VacanciesActionType): VacanciesStateType => {
    switch (action.type) {
        case "VACANCIES_SET_IS_FETCHING":
            return {...state, ...action.payload};
        case "VACANCIES_GET_CATALOGUES":
            return {...state, ...action.payload};
        default:
            return state;
    }
};

const setIsFetching = (isFetching: boolean) => {
    return {
        type: 'VACANCIES_SET_IS_FETCHING',
        payload: {isFetching}
    } as const;
};
const setCatalogues = (catalogues: CataloguesResponseType) => {
    return {
        type: 'VACANCIES_GET_CATALOGUES',
        payload: {catalogues}
    } as const;
};


export const getCataloguesTC = () => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setIsFetching(true));
        const catalogues = await HttpsApi.getCatalogues();
        dispatch(setCatalogues(catalogues));
        dispatch(setIsFetching(false));
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
        dispatch(setIsFetching(false));
        return Promise.reject(errorMessage);
    }
};