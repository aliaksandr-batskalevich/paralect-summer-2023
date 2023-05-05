import React from 'react';
import s from './Search.module.scss';
import {withAuthRedirect} from "../../../utils/withAuthRedirect.hoc";
import {Filters} from "./Filters/Filters";
import {SearchField} from "./SearchField/SearchField";
import {Vacancies} from "./Vacancies/Vacancies";
import {Paginator} from "./Paginator/Paginator";

const Search = () => {
    return (
        <div className={s.searchWrapper}>
            <Filters/>
            <div className={s.searchContent}>
                <SearchField/>
                <Vacancies/>
                <Paginator/>
            </div>
        </div>
    );
};

export default withAuthRedirect(Search);