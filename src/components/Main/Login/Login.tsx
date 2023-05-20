import React, {useEffect} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import s from './Login.module.scss';
import {loginTC} from "../../../bll/auth.reducer";
import {useAppDispatch} from "../../../utils/useAppDispatch.hook";
import {Preloader} from "../../commons/Preloader/Preloader";

type LoginPropsType = {
    isAuth: boolean
};

export const Login: React.FC<LoginPropsType> = ({isAuth}) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // hardcore
    const loginData = {
        login: 'sergei.stralenia@gmail.com',
        password: 'paralect123',
        hr: 0,
    };

    useEffect(() => {
        dispatch(loginTC(loginData.login, loginData.password, loginData.hr))
            .catch(reason => {
                const {status, message} = reason;
                navigate(`/error?status=${status}&message=${message}`);
            })
    }, []);

    return (
        isAuth
            ? <Navigate to='/'/>
            : <div className={s.loginWrapper}>
                    <h2>ВЫПОЛНЯЕТСЯ ЛОГИНИЗАЦИЯ</h2>
                    <Preloader/>
            </div>
    );
};