import React, {useEffect} from 'react';
import s from './Search.module.scss';
import {withAuthRedirect} from "../../../utils/withAuthRedirect.hoc";
import {Filters, FormValuesType} from "./Filters/Filters";
import {Vacancies} from "../../commons/Vacancies/Vacancies";
import {useSelector} from "react-redux";
import {
    getCountOnPage,
    getIsVacanciesFetching,
    getIsVacanciesInit,
    getTotalPage,
    getVacancies
} from "../../../bll/vacancies.selector";
import {useAppDispatch} from "../../../utils/useAppDispatch.hook";
import {
    getCataloguesTC,
    getVacanciesTC,
    setIsVacanciesInit
} from "../../../bll/vacancies.reducer";
import {Preloader} from "../../commons/Preloader/Preloader";
import {useNavigate, useSearchParams} from "react-router-dom";
import {SearchField} from "./SearchField/SearchField";

const Search = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isVacanciesInit = useSelector(getIsVacanciesInit);
    const isVacanciesFetching = useSelector(getIsVacanciesFetching);

    const cataloguesQuery = searchParams.get('catalogues');
    const paymentFromQuery = searchParams.get('paymentFrom');
    const paymentToQuery = searchParams.get('paymentTo');
    const keywordQuery = searchParams.get('keyword');
    const pageQuery = searchParams.get('page');

    const cataloguesFetch = cataloguesQuery ? +cataloguesQuery : null;
    const paymentFromFetch = paymentFromQuery ? +paymentFromQuery : null;
    const paymentToFetch = paymentToQuery ? +paymentToQuery : null;
    const keywordFetch = keywordQuery;
    const pageFetch = pageQuery ? +pageQuery : 1;

    const countOnPage = useSelector(getCountOnPage);
    const totalPage = useSelector(getTotalPage);
    const vacancies = useSelector(getVacancies);

    const changeSearchParamsHandler = (values: Record<string, string | number>) => {

        for (const filtersValuesKey in values) {

            const value = values[filtersValuesKey];

            value === ''
                ? searchParams.delete(filtersValuesKey)
                : searchParams.set(filtersValuesKey, String(value));

        }

        setSearchParams(searchParams);
    };

    const filterSubmitHandler = (values: FormValuesType) => {
        changeSearchParamsHandler({...values, page: 1});
    };

    const filterResetHandler = () => {
        setSearchParams();
    };

    const keywordSearchHandler = (keyword: string) => {
        changeSearchParamsHandler({keyword, page: 1});
    };

    const pageChangeHandler = (page: number) => {
        changeSearchParamsHandler({page});
    };

    // INIT PAGE
    useEffect(() => {
        if (!isVacanciesInit) {
            Promise.all([
                dispatch(getCataloguesTC()),
                dispatch(getVacanciesTC(cataloguesFetch, paymentFromFetch, paymentToFetch, keywordFetch, pageFetch, countOnPage)),
            ])
                .then(response => {
                    dispatch(setIsVacanciesInit(true));
                })
                .catch(reason => {
                    const {status, message} = reason;
                    navigate(`/error?status=${status}&message=${message}`);
                });
        }
    }, [isVacanciesInit]);

    // FETCHING BY SEARCH PARAMS
    useEffect(() => {
        if (isVacanciesInit) {
            dispatch(getVacanciesTC(cataloguesFetch, paymentFromFetch, paymentToFetch, keywordFetch, pageFetch, countOnPage))
                .catch(reason => {
                    const {status, message} = reason;
                    navigate(`/error?status=${status}&message=${message}`);
                });
        }
    }, [searchParams]);

    return (
        isVacanciesInit
            ? <div className={s.searchWrapper}>
                <Filters
                    isLoading={isVacanciesFetching}

                    catalogues={cataloguesQuery ? +cataloguesQuery : null}
                    paymentFrom={paymentFromQuery ? +paymentFromQuery : null}
                    paymentTo={paymentToQuery ? +paymentToQuery : null}

                    filterSubmit={filterSubmitHandler}
                    filterReset={filterResetHandler}
                />
                <div className={s.searchContent}>
                    <SearchField
                        isLoading={isVacanciesFetching}
                        keyword={keywordQuery}

                        keywordSearch={keywordSearchHandler}
                    />
                    <Vacancies
                        vacancies={vacancies}
                        isVacanciesFetching={isVacanciesFetching}

                        currentPage={pageQuery ? +pageQuery : 1}
                        totalPage={totalPage}
                        pageChange={pageChangeHandler}
                    />
                </div>
            </div>
            : <Preloader/>
    );
};

export default withAuthRedirect(Search);