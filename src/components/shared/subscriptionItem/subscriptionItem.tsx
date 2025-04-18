import React, { FC } from 'react'

import s from './subscriptionItem.module.scss'
import { Title } from '../../ui/title/title'
import { JCoin } from '../../svgs/svgs';
import testImage from '../../../assets/images/psplus.png'

interface SubscriptionItemProps {
  title: string;
  items: {
    id: number | string;
    currentPrice: number;
    oldPrice?: number; // Делаем опциональным
    image: string;
  }[];
}

const SubscriptionItem = ({ title, items }: SubscriptionItemProps) => {
  return (
    <div className={s.subscription}>
      <Title text={title} />
      <div className={s.items}>
        {items.map((item) => (
          <div key={item.id} className={s.item}>
            <img style={{width: '105px', height: '179px'}} src={testImage} alt={title} />
            <div className={s.price}>
              <p className={s.current}>{item.currentPrice} <JCoin /></p>
              {item.oldPrice && <p className={s.old}>{item.oldPrice}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubscriptionItem