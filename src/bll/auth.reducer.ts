import {ThunkDispatchType} from "../utils/useAppDispatch.hook";
import HttpsApi from "../dal/https.api";
import {LocalStorageApi} from "../dal/localStorage.api";
import {fetchErrorHandler} from "../utils/fetchErrorHandler.function";

export type AuthActionType = ReturnType<typeof setIsAuth>;

type AuthStateType = {
    isAuth: boolean
};

const authInitState: AuthStateType = {
    isAuth: false,
};

export const authReducer = (state: AuthStateType = authInitState, action: AuthActionType): AuthStateType => {
    switch (action.type) {
        case "AUTH_SET_IS_AUTH":
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

export const loginTC = (login: string, password: string, hr: number) => async (dispatch: ThunkDispatchType) => {
    try {
        const response = await HttpsApi.login(login, password, hr);
        LocalStorageApi.setAccessToken(response.access_token);
        LocalStorageApi.setRefreshToken(response.refresh_token);
        dispatch(setIsAuth(true));
    } catch (error) {
        let errorMessage = fetchErrorHandler(error);
        return Promise.reject(errorMessage);
    }
};