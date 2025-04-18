import React, { useState } from 'react'
import s from './OpenableBlock.module.scss'
import { RightArrow } from '../../svgs/svgs'

interface OpenableBlockProps {
  title: string;
  children: React.ReactNode;
}

const OpenableBlock: React.FC<OpenableBlockProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={s.openableBlock}>
      <div className={s.header} onClick={toggleOpen}>
        <span>{title}</span>
        <div className={`${s.arrowContainer} ${isOpen ? s.arrowDown : s.arrowUp}`}>
          <RightArrow />
        </div>
      </div>
      <div className={`${s.content} ${isOpen ? s.open : s.closed}`}>
        {children}
      </div>
    </div>
  )
}

export default OpenableBlock