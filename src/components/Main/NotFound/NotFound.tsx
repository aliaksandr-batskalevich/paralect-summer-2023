import React from 'react';
import s from './NotFound.module.scss';
import {useQuery} from "../../../utils/useAppDispatch.hook";

export const NotFound = () => {

    const query = useQuery();
    const message = query.get('message');

    return (
        <div className={s.pageNotFoundWrapper}>
            <h2>404: PAGE NOT FOUND</h2>
            {message && <p>{message}</p>}
        </div>
    );
};