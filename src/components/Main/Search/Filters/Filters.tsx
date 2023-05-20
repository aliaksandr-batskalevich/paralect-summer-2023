import React from 'react';
import s from './Filters.module.scss';
import './filterMantineStyles.scss';
import {useSelector} from "react-redux";
import {getCataloguesBranches} from "../../../../bll/vacancies.selector";
import {Button, NumberInput, Select, SelectItem} from '@mantine/core';
import {ResetButton} from "./ResetButton/ResetButton";
import {useForm} from "@mantine/form";
import selectIcon from '../../../../assets/images/selectIcon.png';

export type FormValuesType = {
    catalogues: string,
    paymentFrom: number | '',
    paymentTo: number | '',
};

type FiltersPropsType = {
    catalogues: number | null
    paymentFrom: number | null
    paymentTo: number | null
    isLoading: boolean

    filterSubmit: (values: FormValuesType) => void
    filterReset: () => void
};

const converter = (value: number | null): string => value ? String(value) : '';

export const Filters: React.FC<FiltersPropsType> = ({
                                                        catalogues,
                                                        paymentFrom,
                                                        paymentTo,
                                                        isLoading,
                                                        filterSubmit,
                                                        filterReset,
                                                    }) => {

    const cataloguesBranches = useSelector(getCataloguesBranches);

    const initialValues: FormValuesType = {
        catalogues: converter(catalogues),
        paymentFrom: paymentFrom || '',
        paymentTo: paymentTo || '',
    };

    const form = useForm({
        initialValues,
    });

    const resetFormHandler = () => {
            form.setValues({
                catalogues: '',
                paymentFrom: '',
                paymentTo: '',
            });
            filterReset();
    };

    const optionsToRender = cataloguesBranches.map(catalog => ({
        value: String(catalog.key),
        label: catalog.titleTrimmed
    } as SelectItem));


    return (
        <div className={s.filtersWrapper}>
            <div className={s.head}>
                <h3>Фильтры</h3>
                <ResetButton disabled={isLoading} onclick={resetFormHandler}/>
            </div>
            <form onSubmit={form.onSubmit(filterSubmit)}>
                <div className={s.branch}>
                    <Select
                        data-elem='industry-select'
                        className={'filterSelect'}
                        label='Отрасль'
                        placeholder='Выберите отрасль'
                        data={optionsToRender}
                        rightSection={<img className={s.selectIcon} src={selectIcon} alt="selectIcon"/>}
                        {...form.getInputProps('catalogues')}
                    />
                </div>
                <div className={s.payment}>
                    <NumberInput
                        data-elem='salary-from-input'
                        label={'Оклад'}
                        className={'filterInput'}
                        placeholder='От'
                        min={0}
                        max={+form.values.paymentTo || undefined}
                        {...form.getInputProps('paymentFrom')}
                    />
                    <NumberInput
                        data-elem='salary-to-input'
                        className={'filterInput'}
                        placeholder='До'
                        min={+form.values.paymentFrom || 0}
                        {...form.getInputProps('paymentTo')}
                    />
                </div>
                <Button
                    data-elem='search-button'
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