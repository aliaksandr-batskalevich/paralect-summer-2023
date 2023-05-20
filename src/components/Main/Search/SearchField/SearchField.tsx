import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import {Button, TextInput} from '@mantine/core';
import searchIcon from '../../../../assets/images/searchIcon.png';

import s from './SearchField.module.scss';
import './serchMantineStyles.scss';

type SearchFieldPropsType = {
    isLoading: boolean
    keyword: string | null
    keywordSearch: (keyword: string) => void
};

export const SearchField: React.FC<SearchFieldPropsType> = ({keyword, keywordSearch, isLoading}) => {

    const [keywordValue, setKeywordValue] = useState<string>(keyword || '');

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setKeywordValue(event.currentTarget.value);
    };

    const searchOnClickHandler = () => {
        keywordSearch(keywordValue.trim());
    };

    const onKeyDownInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && searchOnClickHandler();
    };

    useEffect(() => {
        setKeywordValue(keyword || '');
    }, [keyword]);

    return (
        <div className={s.searchFieldWrapper}>
            <TextInput
                data-elem='search-input'
                className={'searchInput'}
                // icon={<Search/>} - does not match!!!
                icon={<img src={searchIcon} alt="searchIcon"/>}
                placeholder='Введите название вакансии'
                value={keywordValue}
                onChange={onChangeInputHandler}
                onKeyDown={onKeyDownInputHandler}
            />
            <Button
                data-elem='search-button'
                className={'searchButton'}
                disabled={isLoading}
                type='button'
                onClick={searchOnClickHandler}
            >
                Поиск
            </Button>
        </div>
    );
};