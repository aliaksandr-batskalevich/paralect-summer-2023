import React from 'react';
import s from './Filters.module.scss';
import './filterMantineStyles.scss';
import {useSelector} from "react-redux";
import {getCataloguesBranches} from "../../../../bll/vacancies.selector";
import {useAppDispatch} from "../../../../utils/useAppDispatch.hook";
import {FilterType, setCurrentFilter, setIsSearchParamsInit} from "../../../../bll/vacancies.reducer";
import {Button, NumberInput, Select, SelectItem} from '@mantine/core';
import {ResetButton} from "./ResetButton/ResetButton";
import {useForm} from "@mantine/form";
import selectIcon from '../../../../assets/images/selectIcon.png';

type FormValuesType = {
    branches: string,
    paymentFrom: number | '',
    paymentTo: number | '',
};

type FiltersPropsType = {
    currentFilter: FilterType
    isLoading: boolean
};

const converter = (value: number | null): string => value ? String(value) : '';

export const Filters: React.FC<FiltersPropsType> = ({currentFilter, isLoading}) => {

    const dispatch = useAppDispatch();

    const cataloguesBranches = useSelector(getCataloguesBranches);

    const initialValues: FormValuesType = {
        branches: converter(currentFilter.branchKey),
        paymentFrom: currentFilter.paymentFrom || '',
        paymentTo: currentFilter.paymentTo || '',
    };

    const onSubmit = (values: FormValuesType) => {

        // blocking the application of the same filter
        const condition = converter(currentFilter.branchKey) === values.branches
            && (currentFilter.paymentFrom || '') === values.paymentFrom
            && (currentFilter.paymentTo || '') === values.paymentTo;

        if (!condition) {
            dispatch(setIsSearchParamsInit(false));
            dispatch(setCurrentFilter(+values.branches || null, values.paymentFrom || null, values.paymentTo || null));
        }

    };

    const form = useForm({
        initialValues,
    });

    const resetFormHandler = () => {

        // blocking the application of the same filter
        const condition = form.values.branches === ''
            && form.values.paymentFrom === ''
            && form.values.paymentTo === '';

        if (!condition) {
            form.reset();
            dispatch(setIsSearchParamsInit(false));
            dispatch(setCurrentFilter(null, null, null));
        }
    };

    const optionsToRender = cataloguesBranches.map(branch => ({
        value: String(branch.key),
        label: branch.titleTrimmed
    } as SelectItem));


    return (
        <div className={s.filtersWrapper}>
            <div className={s.head}>
                <h3>Фильтры</h3>
                <ResetButton disabled={isLoading} onclick={resetFormHandler}/>
            </div>
            <form onSubmit={form.onSubmit(onSubmit)}>
                <div className={s.branch}>
                    <Select
                        className={'filterSelect'}
                        label='Отрасль'
                        placeholder='Выберите отрасль'
                        data={optionsToRender}
                        rightSection={<img className={s.selectIcon} src={selectIcon} alt="selectIcon"/>}
                        {...form.getInputProps('branches')}
                    />
                </div>
                <div className={s.payment}>
                    <NumberInput
                        label={'Оклад'}
                        className={'filterInput'}
                        placeholder='От'
                        min={0}
                        max={+form.values.paymentTo || undefined}
                        {...form.getInputProps('paymentFrom')}
                    />
                    <NumberInput
                        className={'filterInput'}
                        placeholder='До'
                        min={+form.values.paymentFrom || 0}
                        {...form.getInputProps('paymentTo')}
                    />
                </div>
                <Button
                    className={'submit'}
                    loading={isLoading}
                    type='submit'
                >
                    Применить
                </Button>
            </form>
        </div>
    );
};