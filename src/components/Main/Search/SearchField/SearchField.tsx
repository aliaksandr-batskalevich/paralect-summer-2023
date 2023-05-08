import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Button, TextInput} from '@mantine/core';
import { Search } from 'tabler-icons-react';
import searchIcon from '../../../../assets/images/searchIcon.png';

import s from './SearchField.module.scss';
import './serchMantineStyles.scss';

type SearchFieldPropsType = {
    keyword: string | null
    setKeyword: (keyword: string | null) => void
    isLoading: boolean
};

export const SearchField: React.FC<SearchFieldPropsType> = ({keyword, setKeyword, isLoading}) => {

    const [keywordValue, setKeywordValue] = useState<string>(keyword || '');

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setKeywordValue(event.currentTarget.value);
    };

    const searchOnClickHandler = () => {
        const newKeyword = keywordValue.trim() || null;

        if (newKeyword === keyword) {
            return;
        }

        if (!newKeyword) {
            setKeyword(null);
            return;
        }

        setKeyword(newKeyword);
    };

    const onKeyDownInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && searchOnClickHandler();
    };


    return (
        <div className={s.searchFieldWrapper}>
            <TextInput
                className={'searchInput'}
                // icon={<Search/>} - does not match!!!
                icon={<img src={searchIcon} alt="searchIcon"/>}
                placeholder='Введите название вакансии'
                value={keywordValue}
                onChange={onChangeInputHandler}
                onKeyDown={onKeyDownInputHandler}
            />
            <Button
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