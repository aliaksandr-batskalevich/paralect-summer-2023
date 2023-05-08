import s from './App.module.scss';
import {useSelector} from "react-redux";
import {getIsAppInit} from "./bll/app.selector";
import {Preloader} from "./components/commons/Preloader/Preloader";
import {Header} from "./components/Header/Header";
import {useAppDispatch} from "./utils/useAppDispatch.hook";
import {setIsAppInit} from "./bll/app.reducer";
import {setIsAuth} from "./bll/auth.reducer";
import {getIsAuth} from "./bll/auth.selector";
import {Main} from "./components/Main/Main";
import {useEffect} from "react";
import {initFavoriteVacancyTC} from "./bll/favorites.reducer";
import {LocalStorageApi} from "./dal/localStorage.api";

function App() {

    const dispatch = useAppDispatch();

    const isAppInit = useSelector(getIsAppInit);
    const isAuth = useSelector(getIsAuth);

    useEffect(() => {
        // update favoritesVacancies data in redux
        LocalStorageApi.readAccessToken() && dispatch(setIsAuth(true));

        dispatch(initFavoriteVacancyTC());
        dispatch(setIsAppInit(true));
    }, []);

    return (
        isAppInit
            ? <div className={s.appWrapper}>
                <Header isAuth={isAuth} />
                <Main isAuth={isAuth} />
            </div>
            : <Preloader/>
    );
}

export default App;
