import React, { useState, useEffect } from 'react';
import s from './CustomSelect.module.scss';
import { RightArrow } from '../../svgs/svgs';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomSelectProps {
    options: string[];
    onSelect: (option: string) => void;
    defaultOption?: string;
    placeholder?: string,
    noMargin?: boolean,
    type?: string // 'platform' | 'date'
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, onSelect, placeholder, noMargin, type, defaultOption }) => {
    const [isOpened, setOpened] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(defaultOption || null);

    useEffect(() => {
        if (defaultOption) {
            setSelectedOption(defaultOption);
        }
    }, [defaultOption]);

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        setOpened(false);
        onSelect(option);
    };
    const truncateString = (str: string, num: number) => {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + '...';
    };
    return (
        <div style={noMargin ? {padding: '0'} : {}} className={s.selectWrapper}>
            <div onClick={() => setOpened((prev) => !prev)} className={s.select}>
                <p className={`${selectedOption ? s.selectedItem : s.placeholder}`} style={type ? {color: '#ABABB0'} : {}}>{selectedOption ? truncateString(selectedOption, 16) : placeholder  ? placeholder : 'Выберите количество'}</p>
                <motion.div 
                    animate={{ rotate: isOpened ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <RightArrow />
                </motion.div>
            </div>
            <AnimatePresence>
                {isOpened && (
                    <motion.div 
                        className={s.optionsWrapper}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className={s.options}>
                            {options.map((option, index) => (
                                <div 
                                    key={index} 
                                    className={`${s.option} ${type === 'platform' ? s.platform : type === 'date' ? s.date : ''} ${selectedOption === option ? s.activeOption : ''}`}
                                    onClick={() => handleSelect(option)}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomSelect;