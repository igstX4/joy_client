import React, { FC } from 'react'
import s from './Header.module.scss'
import { CartSvg, PersonSvg } from '../../svgs/svgs';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

interface RoundInfoProps {
  element: React.ReactNode;
  quantity?: number
}
const RoundInfo : FC<RoundInfoProps> = ({element, quantity}) => {
  return (
    <div className={s.round} style={!quantity ? {marginBottom: '0px', width: '34px', height: '34px'} : {}}>
      {element}
      {quantity && <div className={s.number}>{quantity}</div>}
    </div>
  )
}
export const JRound = ({type, quantity } : {type: string, quantity?: number}) => {
  if (type === 'J') {
    return <RoundInfo element={<p className={s.jLetter}>J</p>} quantity={quantity} />
  } else {
    return <RoundInfo element={<p className={s.jLetter}>J<span>+</span></p>} quantity={quantity} />
  }
}
const Header = () => {
  const navigate = useNavigate()
  return (
    <motion.div 
      className={s.header}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div onClick={() => navigate('/')} className={s.rounds}>
        {/* <RoundInfo element={<p className={s.jLetter}>J</p>} quantity={8545} /> */}
        <JRound type='J' quantity={8545} />
        <JRound type='J+' quantity={200} />
        {/* <RoundInfo element={<p className={s.jLetter}>J<span>+</span></p>} quantity={200} /> */}
      </div>
      <div className={s.rightBtns}>
        <div onClick={() => navigate('/cart')} className={`${s.button} icon-theme`}><CartSvg /></div>
        <div onClick={() => navigate('/profile')} className={`${s.button} icon-theme`}><PersonSvg /></div>
      </div>
    </motion.div>
  )
}

export default Header