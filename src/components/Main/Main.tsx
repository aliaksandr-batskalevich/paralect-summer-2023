import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import s from './Main.module.scss';
import Search from "./Search/Search";
import {Favorites} from "./Favorites/Favorites";
import {ErrorPage} from "./ErrorPage/ErrorPage";
import {Login} from "./Login/Login";
import {Vacancy} from "./Vacancy/Vacancy";

type MainPropsType = {
    isAuth: boolean
}

export const Main: React.FC<MainPropsType> = ({isAuth}) => {

    return (
        <div className={s.mainWrapper}>
            <div className={'container'}>
                <Routes>
                    <Route path='/' element={<Navigate to='/search'/>}/>
                    <Route path='/search' element={<Search/>}/>
                    <Route path='/search/:id' element={<Vacancy/>}/>
                    <Route path='/favorites' element={<Favorites/>}/>
                    <Route path='/login' element={<Login isAuth={isAuth}/>}/>
                    <Route path='/error' element={<ErrorPage/>}/>
                    <Route path='/*' element={<Navigate to='/error?status=404&message=Страница%20не%20найдена.'/>}/>
                </Routes>
            </div>
        </div>
    );
};