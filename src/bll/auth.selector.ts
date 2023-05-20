import {RootStateType} from "./store";

export const getIsAuth = (state: RootStateType): boolean => state.auth.isAuth;