import {RootStateType} from "./store";

export const getIsAuth = (state: RootStateType): boolean => state.auth.isAuth;
export const getIsAuthing = (state: RootStateType): boolean => state.auth.isAuthing;