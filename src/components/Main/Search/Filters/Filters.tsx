import React from 'react';
import s from './Filters.module.scss';
import {useFormik} from "formik";

type FormikValuesType = {
    catalogues: string,
    paymentFrom: string,
    paymentTo: string,
};

export const Filters = () => {

    const initialValues: FormikValuesType = {
        catalogues: '',
        paymentFrom: '',
        paymentTo: '',
    };

    const validate = (values: FormikValuesType) => {

    };

    const onSubmit = (values: FormikValuesType) => {
        alert(JSON.stringify(values));
    };

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit,
    });

    return (
        <div className={s.filtersWrapper}>
            <form onSubmit={formik.handleSubmit}>
                <select
                    id="catalogues"
                    {...formik.getFieldProps}
                >
                    <option value="" disabled selected hidden>Выберите отрасль</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <button type='submit'>Применить</button>
            </form>
        </div>
    );
};