import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import s from './Main.module.scss';
import Search from "./Search/Search";
import {Favorites} from "./Favorites/Favorites";
import {NotFound} from "./NotFound/NotFound";
import {Login} from "./Login/Login";

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
                    <Route path='/favorites' element={<Favorites/>}/>
                    <Route path='/login' element={<Login isAuth={isAuth} isHrDisabled={true}/>}/>
                    <Route path='/404' element={<NotFound/>}/>
                    <Route path='/*' element={<Navigate to='/404'/>}/>
                </Routes>
            </div>
        </div>
    );
};