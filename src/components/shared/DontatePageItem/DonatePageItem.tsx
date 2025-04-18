import React, { forwardRef } from 'react'
import s from './DonatePageItem.module.scss'
// import { Title } from '../../ui/title/title'
// import rogue from '../../../assets/images/rogue.jpg'
import { JCoin } from '../../svgs/svgs';
import DiscountTag from '../DiscountTag/DiscountTag';
import { useNavigate } from 'react-router-dom';

interface DonatePageItemI {
    id: string | number;
    title: string;
    currentPrice: number;
    oldPrice?: number;
    image: string;
    discount?: number
    notDonate?: boolean
  }
  
//   interface CategoryItemProps {
//     title: string;
//     type: 'popular' | 'discount' | 'donate' | 'preorder' | 'new' | 'sport' | 'car' | 'fighting';
//     items: GameItem[];
//   }
  
const DonatePageItem = forwardRef<HTMLDivElement, DonatePageItemI>(({
    id,
    title,
    currentPrice,
    oldPrice,
    image,
    discount,
    notDonate
}, ref) => {
    const navigate = useNavigate()

    const handleClick = () => {
        if (notDonate) {
            navigate('/game/' + id)
        } else {
            navigate('/donate/' + id)
        }
    }
    return (
        <div ref={ref} onClick={handleClick} key={id} className={s.donateItem}>
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <div className={s.priceContainer}>
                <p className={s.current_price}>{currentPrice} <JCoin /></p>
                {oldPrice && <p className={s.oldPrice}>{oldPrice} ₽</p>}
                {discount && <DiscountTag smaller={true} value={discount} />}
            </div>
        </div>
    )
})

export default DonatePageItem