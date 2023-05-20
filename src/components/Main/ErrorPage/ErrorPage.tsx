import React from 'react';
import s from './ErrorPage.module.scss';
import './errorPageMantineStyles.scss';
import errorImage from '../../../assets/images/errorImage.png';
import {useQuery} from "../../../utils/useAppDispatch.hook";
import {Button} from "@mantine/core";
import {useNavigate} from "react-router-dom";

export const ErrorPage = () => {

    const navigate = useNavigate();
    const query = useQuery();
    const message = query.get('message');
    const status = query.get('status');

    const goBackHandler = () => {
        navigate(-1);
    };

    return (
        <div className={s.errorPageWrapper}>
            <div className={s.flexWrapper}>
                <div className={s.imageWrapper}>
                    <img src={errorImage} alt="errorImage"/>
                </div>
                <div className={s.infoWrapper}>
                    <h2>Что-то пошло не так...</h2>
                    <p>
                        {status
                        && status !== 'undefined'
                        && <span>{status + ': '}</span>}
                        {!!message && <span>{message}</span>}
                    </p>
                    <Button
                        className='error-page-button-go-back'
                        type='button'
                        onClick={goBackHandler}
                    >
                        Попробовать еще раз
                    </Button>
                </div>
            </div>
        </div>
    );
};