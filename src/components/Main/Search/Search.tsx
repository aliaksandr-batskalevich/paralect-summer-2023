import React, {useEffect} from 'react';
import s from './Search.module.scss';
import {withAuthRedirect} from "../../../utils/withAuthRedirect.hoc";
import {Filters} from "./Filters/Filters";
import {SearchField} from "./SearchField/SearchField";
import {Vacancies} from "./Vacancies/Vacancies";
import {useSelector} from "react-redux";
import {
    getCountOnPage,
    getCurrentFilter,
    getCurrentPage, getIsSearchParamsInit,
    getIsVacanciesFetching,
    getIsVacanciesInit,
    getKeyword,
    getTotalPage,
    getVacancies
} from "../../../bll/vacancies.selector";
import {useAppDispatch} from "../../../utils/useAppDispatch.hook";
import {
    getCataloguesTC,
    getVacanciesTC, setIsSearchParamsInit,
    setIsVacanciesInit,
    setKeyword,
    setSearchCurrentPage
} from "../../../bll/vacancies.reducer";
import {Preloader} from "../../commons/Preloader/Preloader";

const Search = () => {

    const dispatch = useAppDispatch();

    const isVacanciesInit = useSelector(getIsVacanciesInit);
    const isSearchParamsInit = useSelector(getIsSearchParamsInit);
    const isVacanciesFetching = useSelector(getIsVacanciesFetching);
    const currentFilter = useSelector(getCurrentFilter);
    const keyword = useSelector(getKeyword);
    const currentPage = useSelector(getCurrentPage);
    const countOnPage = useSelector(getCountOnPage);
    const totalPage = useSelector(getTotalPage);
    const vacancies = useSelector(getVacancies);

    const isLoading = !isSearchParamsInit || isVacanciesFetching;

    const setKeywordHandler = (keyword: string | null) => {
        dispatch(setIsSearchParamsInit(false));
        dispatch(setKeyword(keyword));
    };
    const setCurrentPageHandler = (currentPage: number) => {
        dispatch(setSearchCurrentPage(currentPage));
    };

    // init page
    useEffect(() => {
        if (!isVacanciesInit) {
            Promise.all([
                dispatch(getCataloguesTC()),
                dispatch(getVacanciesTC(
                    currentFilter.branchKey,
                    currentFilter.paymentFrom,
                    currentFilter.paymentTo,
                    keyword,
                    currentPage,
                    countOnPage
                )),
            ])
                .then(response => {
                    dispatch(setIsSearchParamsInit(true));
                    dispatch(setIsVacanciesInit(true));
                });
        }
    }, [isVacanciesInit, dispatch]);

    // FETCHING vacancies by filters and keyword
    useEffect(() => {
        if (isVacanciesInit && !isSearchParamsInit) {

            // set start page - 1 for fetching y new filter
            const startPage = 1;
            setCurrentPageHandler(startPage);

            dispatch(getVacanciesTC(
                currentFilter.branchKey,
                currentFilter.paymentFrom,
                currentFilter.paymentTo,
                keyword,
                startPage,
                countOnPage
            ))
                .then(response => {
                    dispatch(setIsSearchParamsInit(true));
                });
        }
    }, [dispatch, currentFilter, keyword]);

    // FETCHING vacancies by current page
    useEffect(() => {
        if (isVacanciesInit && isSearchParamsInit) {
            dispatch(getVacanciesTC(
                currentFilter.branchKey,
                currentFilter.paymentFrom,
                currentFilter.paymentTo,
                keyword,
                currentPage,
                countOnPage
            ));
        }
    }, [dispatch, currentPage, countOnPage]);

    return (
        isVacanciesInit
            ? <div className={s.searchWrapper}>
                <Filters
                    currentFilter={currentFilter}
                    isLoading={isLoading}
                />
                <div className={s.searchContent}>
                    <SearchField
                        keyword={keyword}
                        setKeyword={setKeywordHandler}
                        isLoading={isLoading}
                    />
                    {isSearchParamsInit
                        ? <Vacancies
                            vacancies={vacancies}
                            isVacanciesFetching={isVacanciesFetching}

                            currentPage={currentPage}
                            totalPage={totalPage}
                            setCurrentPage={setCurrentPageHandler}
                        />
                        : <Preloader/>}
                </div>
            </div>
            : <Preloader/>
    );
};

export default withAuthRedirect(Search);