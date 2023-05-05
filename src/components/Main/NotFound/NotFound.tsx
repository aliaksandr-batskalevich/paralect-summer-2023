import React from 'react';
import s from './NotFound.module.scss';

export const NotFound = () => {
    return (
        <div className={s.notFoundWrapper}>
            <h2>404</h2>
            <p>Page not found.</p>
        </div>
    );
};