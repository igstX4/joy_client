import React, { FC } from 'react'
import s from './TypeSelect.module.scss'
import Button from '../../ui/button/button'


interface TypeSelectI {
    setType: ((str: string) => void)
    type: string
}
const TypeSelect : FC<TypeSelectI> = ({type, setType}) => {
    return (
        <div className={s.typeSelect}>
            <div className={s.line}></div>
            <div onClick={() => setType('games')} className={s.white}><Button customStyles={{ width: '90px' }} variant={type === 'games' ? 'filled' : 'empty'} text='Игры' onClick={() => null} /></div>
            <div onClick={() => setType('sub')} className={s.white}><Button text='Подписки' variant={type === 'sub' ? 'filled' : 'empty'} onClick={() => null} /></div>
        </div>
    )
}

export default TypeSelect