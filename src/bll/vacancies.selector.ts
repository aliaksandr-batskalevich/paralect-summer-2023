import {createSelector} from 'reselect';
import {RootStateType} from "./store";
import {CataloguesResponseType} from "../models/catalogues.response";
import {CataloguesBranchType} from "../models/cataloguesBranches";
import {FilterType} from "./vacancies.reducer";
import {VacancyToListType, VacancyType, VacancyWithDetailType} from "../models/vacancies";
import {detailVacancyMaker, vacancyToListMaker} from "../utils/vacancy.functions";


// SELECTORS
export const getIsVacanciesInit = (state: RootStateType): boolean => state.vacancies.isInit;
export const getIsSearchParamsInit = (state: RootStateType): boolean => state.vacancies.isSearchParamsInit;
export const getIsVacanciesFetching = (state: RootStateType): boolean => state.vacancies.isVacanciesFetching;
export const getIsVacancyFetching = (state: RootStateType): boolean => state.vacancies.isVacancyFetching;
export const getVacanciesCatalogues = (state: RootStateType): CataloguesResponseType => state.vacancies.catalogues;
export const getCurrentFilter = (state: RootStateType): FilterType => state.vacancies.currentFilter;
export const getKeyword = (state: RootStateType): string | null => state.vacancies.keyword;
export const getTotalPage = (state: RootStateType): number | null => state.vacancies.totalPage;
export const getCurrentPage = (state: RootStateType): number => state.vacancies.currentPage;
export const getCountOnPage = (state: RootStateType): number => state.vacancies.countOnPage;
const getVacanciesFull = (state: RootStateType): Array<VacancyType> => state.vacancies.vacancies;
const getVacancyFull = (state: RootStateType): VacancyType | null => state.vacancies.vacancy;


//SELECTORS BY RESELECT
export const getCataloguesBranches = createSelector(getVacanciesCatalogues, (catalogues: CataloguesResponseType): Array<CataloguesBranchType> => catalogues.map(branch => ({titleTrimmed: branch.title_trimmed, key: branch.key})));

export const getVacancies = createSelector(getVacanciesFull, (vacancies: Array<VacancyType>): Array<VacancyToListType> => vacancies.map(vacancyToListMaker));

export const getVacancyWithDetail = createSelector(getVacancyFull, (fullVacancy: VacancyType | null): VacancyWithDetailType | null => {
    if (!fullVacancy) return null;

    const vacancyWithDetail = {
        vacancyToList: vacancyToListMaker(fullVacancy),
        detail: detailVacancyMaker(fullVacancy),
    }

    return vacancyWithDetail;
});