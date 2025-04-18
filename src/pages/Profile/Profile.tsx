import React, { useState, useEffect } from 'react'
import s from './Profile.module.scss'
import { JRound } from '../../components/shared/Header/Header'
import Button from '../../components/ui/button/button'
import TextWithLines from '../../components/shared/TextWithLines/TextWithLines'
import { Key, Lock, MailIcon, MicroSvg, Star, SuccessIcon, TgIcon } from '../../components/svgs/svgs'
import PlatformChoose from '../../components/shared/PlatformChoose/PlatformChoose'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { updateUserSettings, updateUserPlatform } from '../../store/slices/userSlice'
import { IUpdateUserSettings } from '../../types/user.types'

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user, isLoading } = useAppSelector(state => state.user)
  
  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        password: user.password || '',
        code: user.code || '',
        platform: user.platform || 'ps4'
      })
    }
  }, [user])

  const [formData, setFormData] = useState<IUpdateUserSettings>({
    email: '',
    password: '',
    code: '',
    platform: 'ps4'
  })

  const handleInputChange = (field: keyof IUpdateUserSettings) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  const handleSaveSettings = async () => {
    try {
      const params = new URLSearchParams()
      Object.entries(formData).forEach(([key, value]) => {
        if (value) params.append(key, value)
      })
      
      await dispatch(updateUserSettings(params.toString())).unwrap()
    } catch (error) {
      console.error('Ошибка обновления настроек:', error)
    }
  }

  const handlePlatformChange = async (platform: string) => {
    try {
      setFormData(prev => ({
        ...prev,
        platform
      }))
      
      await dispatch(updateUserPlatform(platform.toUpperCase())).unwrap()
    } catch (error) {
      console.error('Ошибка обновления платформы:', error)
    }
  }

  return (
    <div className={s.profile}>
      <div className={s.profile_top}>
        <div className={s.contentItem}>
          <div className={s.item}>
            <JRound type='J' />
            <div className={s.right}>
              <p className={s.label}>Баланс Joy</p>
              <p className={s.number}>{user?.jBal || 0}</p>
            </div>
          </div>
          <Button 
            text='Пополнить' 
            customStyles={{ width: '100%', height: '34px' }} 
            onClick={() => navigate('/deposit')} 
          />
        </div>
        <div className={s.contentItem}>
          <div className={s.item}>
            <JRound type='J+' />
            <div className={s.right}>
              <p className={s.label}>Баланс Joy Plus</p>
              <p className={s.number}>{user?.jPlus || 0}</p>
            </div>
          </div>
          <Button 
            text='Как заработать?' 
            variant='empty' 
            customStyles={{ width: '100%', height: '34px' }} 
            onClick={() => null} 
          />
        </div>
      </div>
      <p className={s.grayInfo}>
        Joy - валюта нашего магазина. Преимущества джоев в скидке, которую они дают на весь ассортимент нашего магазина, а так же моментальный возврат в случае каких то проблем на стороне Sony. 
        <br/>
        <br/>
        1 Joy = 1 рубль
      </p>
      <TextWithLines text='Учетная запись'/>
      <div className={s.inputs}>
        <div className={s.inputWrapper}>
          <div className={s.inputDiv}>
            <MailIcon />
            <input 
              placeholder='Введите почту от аккаунта' 
              value={formData.email || ''}
              autoComplete='off'
              onChange={handleInputChange('email')}
            />
          </div>
          <p className={s.deskription}>Почта или же идентификатор входа в сеть - Вам нужно ввести в поле ту почту, на которую создавался аккаунт</p>
        </div>
        <div className={s.inputWrapper}>
          <div className={s.inputDiv}>
            <Lock />
            <input 
              autoComplete='off'
              placeholder='Введите пароль от аккаунта'
              value={formData.password || ''}
              onChange={handleInputChange('password')}
              type="password"
            />
          </div>
          <p className={s.deskription}>Пароль от аккаунта необходим для того чтобы менеджер смог войти в сеть</p>
        </div>
        <div className={s.inputWrapper}>
          <div className={s.inputDiv}>
            <Key />
            <input 
              placeholder='Одноразовый код (Резервный)'
              value={formData.code || ''}
              onChange={handleInputChange('code')}
            />
          </div>
          <p className={s.deskription}>Не обязательно. Но значительно сократит время выполнения заказа. Код доступен для пользователя только с включенной <span>двухфакторной аутентификацией</span></p>
        </div>
        <Button 
          text='Сохранить' 
          customStyles={{ width: '100%', marginTop: '20px' }}
          onClick={handleSaveSettings}
          // disabled={isLoading}
        />
      </div>
      <PlatformChoose 
        platform={formData.platform || 'PS4'} 
        setPlatform={handlePlatformChange}
      />
      <div className={s.buyerCorner}>
        <TextWithLines text='Уголок покупателя'/>
        <div className={s.cornerBtns}>
          <Button 
            variant='empty' 
            icon={<Star />} 
            text='Избранное' 
            onClick={() => navigate('/favourite')} 
            customStyles={{width: '50%', height: '34px'}}
          />
          <Button 
            variant='empty' 
            icon={<SuccessIcon />} 
            text='История покупок' 
            onClick={() => navigate('/history')} 
            customStyles={{width: '50%', height: '34px'}}
          />
        </div>
        <div className={s.infoBlocks}>
          <div className={s.infoBlock}>
            <div className={s.imgDiv}>
              <MicroSvg />
            </div>
            <p>Техническая поддержка</p>
          </div>
          <div className={s.infoBlock}>
            <div className={s.imgDiv}>
              <TgIcon />
            </div>
            <p>Telegram сообщество JoyStickStore</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile