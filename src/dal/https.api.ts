import {LoginResponseType} from "../models/login.response";
import {instance} from "./instance";
import {CataloguesResponseType} from "../models/catalogues.response";
import {VacanciesResponseType, VacancyType} from "../models/vacancies";

export class HttpsApi {

    static login(login: string, password: string, hr: number): Promise<LoginResponseType> {

        const queryParams = `?login=${login}&password=${password}&hr=${hr}&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948`;

        return instance.get<LoginResponseType>('oauth2/password/' + queryParams).then(response => response.data);
    }

    static getCatalogues(): Promise<CataloguesResponseType> {
        return instance.get<CataloguesResponseType>('catalogues/').then(response => response.data);
    }

    static getVacancies(catalogues: number | null, payment_from: number | null, payment_to: number | null, keyword: string | null, page: number, count: number): Promise<VacanciesResponseType> {
        const args = {catalogues, payment_from, payment_to, keyword, page: page - 1, count};
        const keys = Object.keys(args);
        const values = Object.values(args);

        const queryParamsArr = values
            .map((value, index) => value ? `${keys[index]}=${value}` : value)
            .filter(value => value);
        queryParamsArr.push('published=1');

        const queryParams = queryParamsArr.join('&');

        return instance.get<VacanciesResponseType>(`vacancies/?${queryParams}`)
            .then(response => response.data);
    }

    static getVacancy(id: number): Promise<VacancyType> {
        return instance.get<VacancyType>(`vacancies/${id}/`)
            .then(response => response.data);
    }

    static getFavoriteVacancies(ids: Array<number>, countOnPage: number, currentPage: number): Promise<VacanciesResponseType> {

        const idsQueryParams = ids
            .map(id => `ids[]=${id}`)
            .join('&');

        return instance.get<VacanciesResponseType>(`vacancies/?${idsQueryParams}&count=${countOnPage}&page=${currentPage - 1}`)
            .then(response => response.data);
    }

}