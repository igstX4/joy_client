import React, { FC, useState } from 'react'
import s from './searchInput.module.scss'
import { SearchSvg } from '../../svgs/svgs'
import { BackArrow } from '../../svgs/adminSvgs'

interface SearchInputI {
  noMargin?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

const SearchInput: FC<SearchInputI> = ({ 
  noMargin, 
  onFocus, 
  onBlur, 
  onChange, 
  value,
  showBackButton,
  onBack
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
      if (onBlur) onBlur();
    }, 200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
  };

  const handleBack = () => {
    if (onBack) onBack();
  };

  return (
    <div
      style={noMargin ? { marginTop: '0px', marginLeft: '0px', marginRight: '0px', width: '100%' } : {}}
      className={`${s.inputDiv} ${isFocused ? s.focused : ''} ${onFocus ? s.withFocus : ''}`}
    >
      {showBackButton ? (
        <div className={s.backButton} onClick={handleBack}>
          <BackArrow />
        </div>
      ) : (
        <SearchSvg />
      )}
      <input
        placeholder='Поиск игр'
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value || ''}
      />
      {/* {!inputValue && !isFocused && <span className={s.placeholder}>Введите ваш запрос</span>} */}
    </div>
  )
}

export default SearchInput