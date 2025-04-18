import React, { FC } from 'react'
import s from './DiscountTag.module.scss'


interface DiscountTagI {
    value: number
    smaller? : boolean
}

const DiscountTag : FC<DiscountTagI> = ({value, smaller}) => {
  return (
    <div style={smaller ? {fontSize: '5px', minWidth: '16px', height: '10px'} : {}} className={s.discountTag}>
        -{value} %
    </div>
  )
}

export default DiscountTag