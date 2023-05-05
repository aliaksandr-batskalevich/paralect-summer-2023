import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import s from './Login.module.scss';
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import {getIsAuthing} from "../../../bll/auth.selector";
import {loginTC} from "../../../bll/auth.reducer";
import {useAppDispatch} from "../../../utils/useAppDispatch.hook";

type LoginPropsType = {
    isAuth: boolean
    isHrDisabled: boolean
};

type FormikValuesType = {
    login: 'sergei.stralenia@gmail.com',
    password: 'paralect123',
    hr: boolean
};

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const Login: React.FC<LoginPropsType> = ({isAuth, isHrDisabled}) => {

    const [fetchError, setFetchError] = useState<null | string>(null);

    const dispatch = useAppDispatch();

    const isAuthing = useSelector(getIsAuthing);

    const initialValues: FormikValuesType = {
        login: 'sergei.stralenia@gmail.com',
        password: 'paralect123',
        hr: false,
    };

    const validate = (values: FormikValuesType) => {
        let errors: Partial<{ login: string, password: string }> = {};

        if (!values.login.trim().length) {
            errors.login = `Field 'login' is required!`;
        } else if (!emailRegex.test(values.login)) {
            errors.login = `Incorrect login!`;
        }

        if (!values.password.trim().length) {
            errors.password = `Field 'password' is required!`
        }

        return errors;
    }

    const onSubmit = (values: FormikValuesType) => {
        setFetchError(null);
        const hr = Number(values.hr);
        dispatch(loginTC(values.login, values.password, hr))
            .catch(reason => {
                setFetchError(reason);
            });
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate,
    });

    const hrClassName = isHrDisabled ? `${s.hrDisabled} ${s.hr}` : `${s.hr} ${s.hrCursor}`;

    const isSubmitDisabled = !!Object.keys(validate(formik.values)).length || isAuthing;
    const buttonDisabledStyle = {cursor: 'auto'};
    const buttonStyle = isSubmitDisabled ? buttonDisabledStyle : undefined;

    return (
        isAuth
            ? <Navigate to='/'/>
            : <div className={s.loginWrapper}>
                <form onSubmit={formik.handleSubmit}>
                    <h2>LOGIN</h2>

                    <input
                        type="text"
                        placeholder='login'
                        {...formik.getFieldProps('login')}
                    />
                    {formik.errors.login && <p className={s.errors}>{formik.errors.login}</p>}

                    <input
                        type="text"
                        placeholder='password'
                        {...formik.getFieldProps('password')}
                    />
                    {formik.errors.password && <p className={s.errors}>{formik.errors.password}</p>}

                    <div className={hrClassName}>
                        <input
                            id='hr'
                            type="checkbox"
                            disabled={isHrDisabled}
                            {...formik.getFieldProps('hr')}
                        />
                        <label htmlFor="hr">Hiring</label>
                    </div>

                    <button type='submit' disabled={isSubmitDisabled} style={buttonStyle}>Войти</button>
                    <p className={s.errors}>{fetchError}</p>
                </form>
            </div>
    );
};