import React, { useEffect } from 'react'
import s from './GlobalLayout.module.scss'
import Header from '../../shared/Header/Header'
import { Outlet } from 'react-router'
import { useAppDispatch } from '../../../store/hooks'
import { getCurrentUser } from '../../../store/slices/userSlice'
const GlobalLayout = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getCurrentUser())
  }, [])  
  return (
    <div className={s.container}>
        <Header />
        <div className={s.content}>
            <Outlet />
        </div>
    </div>
  )
}

export default GlobalLayout