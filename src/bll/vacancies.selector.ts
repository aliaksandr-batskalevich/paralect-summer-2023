import {RootStateType} from "./store";
import {CataloguesResponseType} from "../models/catalogues.request";

export const getIsFetching = (state: RootStateType): boolean => state.vacancies.isFetching;
export const getVacanciesCatalogues = (state: RootStateType): CataloguesResponseType => state.vacancies.catalogues;
