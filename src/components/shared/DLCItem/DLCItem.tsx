// import React from 'react'
import { FC } from 'react'
import s from './DLCItem.module.scss'
import { JCoin } from '../../svgs/svgs'
import DiscountTag from '../DiscountTag/DiscountTag'




const Item : FC<DLCItemI> = ({name, currentPrice, oldPrice, discount, platform, image}) => {
    return (
        <div className={s.item}>
            <img src={image} />
            <div className={s.right}>
            <h1 className={s.name}>{name}</h1>
            <div className={s.priceDiv}>
                <p className={s.current_price}>{currentPrice} <JCoin /></p>
                <p className={s.old_price}>{oldPrice}</p>
                {discount && <DiscountTag value={discount}/>}
            </div>
            <p className={s.platform}>Платформа: {platform}</p>
            </div>
        </div>
    )
}
interface DLCItemI {
    name: string,
    currentPrice: number,
    oldPrice: number,
    discount?: number,
    platform: string
    image: string
}
interface DLCItemProps {
    items : DLCItemI[]
}
const DLCItem : FC<DLCItemProps> = ({items}) => {
  return (
    <div className={s.DLCItem}>
        <h2 className={s.localTitle}>Дополнения:</h2>
        <div className={s.items}>
            {items.map((item) => <Item name={item.name} currentPrice={item.currentPrice} oldPrice={item.oldPrice} discount={item.discount} platform={item.platform} image={item.image}/>) }
        </div>
    </div>
  )
}

export default DLCItem