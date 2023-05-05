import {LoginResponseType} from "../models/login.request";
import {instance} from "./instance";
import {CataloguesResponseType} from "../models/catalogues.request";

export class HttpsApi {
    static login(login: string, password: string, hr: number): Promise<LoginResponseType> {

        const queryParams = `?login=${login}&password=${password}&hr=${hr}&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948`;

        return instance.get<LoginResponseType>('oauth2/password/' + queryParams).then(response => response.data);
    }

    static getCatalogues(): Promise<CataloguesResponseType> {
        return instance.get<CataloguesResponseType>('catalogues/').then(response => response.data);
    }

}