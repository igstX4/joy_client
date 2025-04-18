import React, { FC } from 'react'
import s from './button.module.scss'
import filledIcon from '../../../assets/images/filledIcon.png'
import emptyIcon from '../../../assets/images/emptyIcon.png'



interface ButtonI {
    text: string,
    onClick: () => void,
    variant?: 'filled' | 'empty',
    icon?: React.ReactNode
    customStyles?: React.CSSProperties,
    isChecked?: boolean,
    disabled?: boolean
}

const Button : FC<ButtonI> = ({text, onClick, variant = 'filled', customStyles, icon, isChecked, disabled}) => {
  return (
    <div style={customStyles} className={s.buttonWrapper}>
      {isChecked ? <img className={s.icon}  src={variant === 'filled' ? filledIcon : emptyIcon}/> : null}
      <button 
        onClick={onClick} 
        className={`${s.button} ${variant === 'empty' ? s.empty : ''}`} 
        disabled={disabled}
      >
        {icon && <div style={{marginRight: '5px'}}>{icon}</div>}{text}
      </button>
    </div>
  )
}

export default Button