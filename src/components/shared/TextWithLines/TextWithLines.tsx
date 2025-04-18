import React from 'react'
import s from './TextWithLines.module.scss'

const TextWithLines = ({text} : {text: string}) => {
  return (
    <div className={s.textWithLines}>
        <div className={s.line}></div>
        <div className={s.text}>{text}</div>
    </div>
  )
}

export default TextWithLines