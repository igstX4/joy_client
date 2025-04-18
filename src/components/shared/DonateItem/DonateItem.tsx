import React from 'react'
import s from './DonateItem.module.scss'
import { Title } from '../../ui/title/title'
import rogue from '../../../assets/images/rogue.jpg'
import { useNavigate } from 'react-router'
const DonateItem = () => {
  const navigate = useNavigate()
  return (
    <div  className={s.donateItem}>
        <Title text='Игровой донат' type='donate'/>
        <div onClick={() => navigate('/donate')} className={s.items}>
            <img src={rogue} />
            <img src={rogue} />
        </div>
    </div>
  )
}

export default DonateItem