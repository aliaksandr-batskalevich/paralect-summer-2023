import React from 'react';
import s from './ResetButton.module.scss';

type ResetButtonPropsType = {
    disabled: boolean
    onclick: () => void
};

export const ResetButton: React.FC<ResetButtonPropsType> = ({onclick, disabled}) => {

    const disabledStyle = {
        cursor: 'auto',
        pointerEvents: 'none' as const,
    };

    return (
        <div
            className={s.ResetButtonWrapper}
            onClick={onclick}
            style={disabled ? disabledStyle : undefined}
        >
            Сбросить все
        </div>
    );
};