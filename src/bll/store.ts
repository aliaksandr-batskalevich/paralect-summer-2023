import {combineReducers, legacy_createStore, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk';
import {AppActionType, appReducer} from "./app.reducer";
import {AuthActionType, authReducer} from "./auth.reducer";
import {VacanciesActionType, vacanciesReducer} from "./vacancies.reducer";
import {FavoritesActionType, favoritesReducer} from "./favorites.reducer";

export type RootActionsType = AppActionType | AuthActionType | VacanciesActionType | FavoritesActionType;

export type RootStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    vacancies: vacanciesReducer,
    favorites: favoritesReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));