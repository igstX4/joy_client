// import React from 'react'
import s from './ChooseRegion.module.scss'
import logo from '../../assets/images/logo.png'
import BGStartImage from '../../assets/images/bgStartImage.png'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { updateUserRegion } from '../../store/slices/userSlice'
import { useEffect } from 'react'
import { Loader } from '../../components/ui/Loader/Loader'
import { REGIONS, RegionCurrency } from '../../constants/regions'

const ChooseRegion = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user, isLoading, error } = useAppSelector(state => state.user);

    // Если у пользователя уже есть регион, перенаправляем на главную
    useEffect(() => {
        if (user?.platform) {
            navigate('/', { replace: true });
        }
    }, [user, navigate]);

    const handleClick = async (currency: RegionCurrency) => {
        try {
            await dispatch(updateUserRegion(currency)).unwrap();
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Ошибка при выборе региона:', error);
        }
    }

    if (isLoading) {
        return (
            <div className={s.container}>
                <Loader />
            </div>
        );
    }

    return (
        <div className={s.container}>
            <div className={s.logoWrapper}>
                <div className={s.logo}>
                    <img src={logo} alt="Logo"/>
                </div>
            </div>
            <div className={s.bottomContent}>
                <div className={s.bgImg}>
                    <img src={BGStartImage} alt="Background"/>
                </div>
                <div className={s.buttons}>
                    {Object.values(REGIONS).map(region => (
                        <button 
                            key={region.id}
                            onClick={() => handleClick(region.currency)}
                            disabled={isLoading}
                        >
                            {region.name}
                        </button>
                    ))}
                </div>
                {error && <p className={s.error}>{error}</p>}
                <h3 className={s.chooseText}>Выберите желаемый регион</h3>
                <div className={s.textBlock}>
                    <p>От выбранного региона зависят цены на товары и локализация языка. К каждому региону привязывается отдельный личный кабинет</p>
                    <br />
                    <p>Важно: если у вас украинский аккаунт, то совершайте покупки через украинский регион в магазине</p>
                </div>
            </div>
        </div>
    )
}

export default ChooseRegion