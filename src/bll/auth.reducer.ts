import {ThunkDispatchType} from "../utils/useAppDispatch.hook";
import axios from "axios";
import {HttpsApi} from "../dal/https.api";
import {LocalStorageApi} from "../dal/localStorage.api";

export type AuthActionType = ReturnType<typeof setIsAuth>
    | ReturnType<typeof setIsAuthing>;

type AuthStateType = {
    isAuth: boolean
    isAuthing: boolean
};

const authInitState: AuthStateType = {
    isAuth: false,
    isAuthing: false,
};

export const authReducer = (state: AuthStateType = authInitState, action: AuthActionType): AuthStateType => {
    switch (action.type) {
        case "AUTH_SET_IS_AUTH":
            return {...state, ...action.payload};
        case "AUTH_SET_IS_AUTHING":
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export const setIsAuth = (isAuth: boolean) => {
    return {
        type: 'AUTH_SET_IS_AUTH',
        payload: {isAuth}
    } as const;
};
const setIsAuthing = (isAuthing: boolean) => {
    return {
        type: 'AUTH_SET_IS_AUTHING',
        payload: {isAuthing}
    } as const;
};

export const loginTC = (login: string, password: string, hr: number) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setIsAuthing(true));
        const response = await HttpsApi.login(login, password, hr);
        LocalStorageApi.setAccessToken(response.access_token);
        LocalStorageApi.setRefreshToken(response.refresh_token);
        dispatch(setIsAuth(true));
        dispatch(setIsAuthing(false));
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
        dispatch(setIsAuthing(false));
        return Promise.reject(errorMessage);
    }
};