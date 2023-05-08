import React from 'react';
import s from './VacancyDetail.module.scss';
import {VacancyDetailType} from "../../../../models/vacancies";

type VacancyDetailPropsType = VacancyDetailType;

export const VacancyDetail: React.FC<VacancyDetailPropsType> = ({
                                                                    work,
                                                                    candidat,
                                                                    compensation
                                                                }) => {

    return (
        <div className={s.vacancyDetailWrapper}>
            {work && <div className={s.work}>
                <h4>Обязанности:</h4>
                <p>{work}</p>
            </div>}

            {candidat && <div className={s.work}>
                <h4>Требования:</h4>
                <p>{candidat}</p>
            </div>}

            {compensation && <div className={s.work}>
                <h4>Условия:</h4>
                <p>{compensation}</p>
            </div>}
        </div>
    );
};