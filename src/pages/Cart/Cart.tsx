import React, { useEffect } from 'react'
import s from './Cart.module.scss'
import Button from '../../components/ui/button/button'
import { CartItem } from '../Favourite/Favourite'
import { DocumentSvg, Key, Lock, MailIcon } from '../../components/svgs/svgs'
import Checkbox from '../../components/ui/checkbox/checkbox'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getCart, removeFromCart, updateCartField } from '../../store/slices/productSlice'
import { Loader } from '../../components/ui/Loader/Loader'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { cart, isLoading } = useAppSelector(state => state.product);
    const [orderType, setOrderType] = React.useState<'На мой аккаунт' | 'Создание аккаунта'>('На мой аккаунт')
    const [didntRegister, setDidntRegister] = React.useState<boolean>(false)
    const [isAgree, setIsAgree] = React.useState<boolean>(false)

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    const handleRemoveFromCart = async (productId: string) => {
        try {
            await dispatch(removeFromCart(productId)).unwrap();
        } catch (error) {
            console.error('Ошибка удаления из корзины:', error);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className={s.content}>
            <h1>Корзина</h1>

            {cart.items.length === 0 ? (
                <div className={s.empty}>
                    <p className={s.infoText}>Здесь хранятся игры, которые вы добавили в корзину.</p>
                    <div className={s.bottomDiv}>
                        <p className={s.infoText}>Вы еще не добавляли игры в Корзину.</p>
                        <Button text='В главное меню' onClick={() => navigate('/')} variant='filled' />
                    </div>
                </div>
            ) : (
                <div className={s.cart}>
                    <div className={s.items}>
                        {cart.items.map((item) => {
                            const discountValue = typeof item.discount === 'string' ? parseInt(item.discount.replace(/[-%]/g, '')) : 0;
                            const currentPrice = Number(item.jPrice);
                            let oldPrice = Number(item.price);
                            
                            if (discountValue > 0) {
                                oldPrice = Math.round(currentPrice / (1 - discountValue / 100));
                            }

                            return (
                                <CartItem
                                    key={item.id}
                                    id={item.productId}
                                    isCart={true}
                                    title={item.name}
                                    edition={item.editionName}
                                    additionalInfo={discountValue > 0 ? [`Скидка ${discountValue}%`] : undefined}
                                    currentPrice={currentPrice}
                                    oldPrice={discountValue > 0 ? oldPrice : 0}
                                    discount={discountValue > 0 ? `${discountValue}%` : undefined}
                                    img={item.image}
                                    onRemove={() => handleRemoveFromCart(item.productId)}
                                />
                            );
                        })}
                    </div>
                    <div className={s.line} />
                    <div className={s.orderCreation}>
                        <h3>Оформить заказ</h3>
                        <div className={s.btns}>
                            <Button 
                                text='На мой аккаунт' 
                                customStyles={{ width: '50%' }} 
                                onClick={() => setOrderType('На мой аккаунт')} 
                                variant={orderType === 'На мой аккаунт' ? 'filled' : 'empty'} 
                            />
                            <Button 
                                text='Создание аккаунта' 
                                customStyles={{ width: '50%' }} 
                                onClick={() => setOrderType('Создание аккаунта')} 
                                variant={orderType === 'Создание аккаунта' ? 'filled' : 'empty'} 
                            />
                        </div>
                        {orderType === 'Создание аккаунта' && (
                            <div className={s.createAccount}>
                                <p className={s.infoText}>
                                    Аккаунт будет бесплатно создан на Вашу почту, мы сразу оформим туда заказ и выдадим от него пароль и дату рождения для его восстановления
                                </p>
                                <div style={{ marginTop: '10px' }} className={s.inputWrapper}>
                                    <div className={s.inputDiv}>
                                        <MailIcon />
                                        <input 
                                            placeholder='Введите почту от аккаунта'
                                            value={cart.email}
                                            onChange={(e) => dispatch(updateCartField({ field: 'email', value: e.target.value }))}
                                        />
                                    </div>
                                    <p className={s.deskription}>Почта для создания должна быть создана в зарубежных сервисах <br /> Примеры: Gmail, Outlook, ICloud, Yahoo</p>
                                </div>
                                <div style={{ marginTop: '10px' }} className={s.checkBoxDiv}>
                                    <Checkbox checked={didntRegister} onChange={(bool: boolean) => setDidntRegister(bool)} />
                                    <p>Я не регистрировал на эту почту никаких аккаунтов Playstation ранее </p>
                                </div>
                            </div>
                        )}
                        {orderType === 'На мой аккаунт' && (
                            <div className={s.existingAccount}>
                                <h2>Данные от аккаунта</h2>
                                <div style={{ marginTop: '20px' }} className={s.inputWrapper}>
                                    <div className={s.inputDiv}>
                                        <Lock />
                                        <input 
                                            placeholder='Введите почту от аккаунта'
                                            value={cart.email}
                                            onChange={(e) => dispatch(updateCartField({ field: 'email', value: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                <div style={{ marginTop: '10px' }} className={s.inputWrapper}>
                                    <div className={s.inputDiv}>
                                        <MailIcon />
                                        <input 
                                            placeholder='Введите пароль от аккаунта'
                                            value={cart.password}
                                            onChange={(e) => dispatch(updateCartField({ field: 'password', value: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                <div className={s.line}></div>
                                <div style={{ marginTop: '10px' }} className={s.inputWrapper}>
                                    <div className={s.inputDiv}>
                                        <Key />
                                        <input 
                                            placeholder='Одноразовый код (Резервный)'
                                            value={cart.code}
                                            onChange={(e) => dispatch(updateCartField({ field: 'code', value: e.target.value }))}
                                        />
                                    </div>
                                    <p className={s.deskription}>Не обязательно. Но значительно сократит время выполнения заказа. Код доступен для пользователя только с включенной <span>двухфакторной аутентификацией</span></p>
                                </div>
                                <div style={{ marginTop: '10px' }} className={s.inputWrapper}>
                                    <div className={s.inputDiv}>
                                        <DocumentSvg />
                                        <input 
                                            placeholder='Введите почту для чека'
                                            value={cart.payEmail}
                                            onChange={(e) => dispatch(updateCartField({ field: 'payEmail', value: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                <div style={{ marginTop: '10px', marginBottom: '100px' }} className={s.checkBoxDiv}>
                                    <Checkbox checked={didntRegister} onChange={(bool: boolean) => setDidntRegister(bool)} />
                                    <p>Запомнить данные для следующих заказов</p>
                                </div>
                            </div>
                        )}
                        {/* <div style={{marginBottom: '40px'}}/> */}
                        <div style={{background: 'var(--background-color)'}} className={s.bottomDiv}>
                            <div className={s.checkBoxDiv}>
                                <Checkbox checked={isAgree} onChange={(bool: boolean) => setIsAgree(bool)} />
                                <p>Я согласен с условиями <span>договора оферты</span></p>
                            </div>
                            <Button text='Оплатить' onClick={() => null} variant='filled' />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart