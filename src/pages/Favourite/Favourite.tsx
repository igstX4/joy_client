import React, { FC, useEffect } from 'react'
import s from './Favourite.module.scss'
import Button from '../../components/ui/button/button'
import { AddToCart, Discount, JCoin, Trash } from '../../components/svgs/svgs'
import DiscountTag from '../../components/shared/DiscountTag/DiscountTag'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getFavorites, removeFromFavorites, addToCart, removeFromCart } from '../../store/slices/productSlice'
import { Loader } from '../../components/ui/Loader/Loader'
import { useNavigate } from 'react-router-dom'

interface CartItemI {
    id: string
    productId: string
    title: string
    currentPrice: number
    oldPrice: number
    discount?: string
    img: string
    edition: string
    additionalInfo?: string[]
    isCart?: boolean
    isHistory?: boolean
    discountTime?: string
    onRemove?: () => void
}

export const CartItem: FC<CartItemI> = ({isHistory, isCart, id, productId, title, currentPrice, oldPrice, discount, img, edition, additionalInfo, discountTime, onRemove }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleRemove = async () => {
        if (onRemove) {
            onRemove();
            return;
        }
        
        try {
            if (isCart) {
                await dispatch(removeFromCart(id)).unwrap();
            } else {
                await dispatch(removeFromFavorites(productId)).unwrap();
            }
        } catch (error) {
            console.error('Ошибка удаления:', error);
        }
    };

    const handleAddToCart = async () => {
        try {
            await dispatch(addToCart(productId)).unwrap();
            navigate('/cart');
        } catch (error) {
            console.error('Ошибка добавления в корзину:', error);
        }
    };

    const discountValue = typeof discount === 'string' ? parseInt(discount.replace(/[-%]/g, '')) : discount ? Number(discount) : 0;

    return (
        <div key={id} className={s.item}>
            <div className={s.right}>
                <img src={img} alt='' />
                <div className={s.info}>
                    <div className={s.editionDiv}>
                        <p className={s.name}>{title}</p>
                        <p className={s.edition}>{edition}</p>
                    </div>
                    <div className={s.priceDiv}>
                        <p className={s.current_price}>{currentPrice} <JCoin /></p>
                        {oldPrice && discountValue > 0 && <p className={s.old_price}>{oldPrice} ₽</p>}
                        {discountValue > 0 && <DiscountTag smaller={true} value={discountValue} />}
                    </div>
                    <ul>
                        {additionalInfo && discountValue > 0 && additionalInfo.map((info, index) => <li key={index}>{info}</li>)}
                        {discountTime && <li>Скидка до {new Date(discountTime).toLocaleDateString('ru-RU')}</li>}
                    </ul>
                </div>
            </div>
            {!isHistory && <div className={s.btns}>
                {/* {!isCart && <button className={s.addToCart} onClick={handleAddToCart}><AddToCart /></button>} */}
                <button className={s.trash} onClick={handleRemove}><Trash /></button>
            </div>}
        </div>
    )
}

const Favourite = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { favorites, isLoading } = useAppSelector(state => state.product);

    useEffect(() => {
        dispatch(getFavorites());
    }, [dispatch]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className={s.content}>
            <h1>Избранное</h1>

            {favorites.length === 0 ? (
                <div className={s.empty}>
                    <p className={s.infoText}>Здесь хранятся понравившиеся Вам игры. <span>Наш бот будет уведомлять Вас, когда игра, добавленная сюда будет по скидке</span></p>
                    <div className={s.bottomDiv}>
                        <p className={s.infoText}>Вы еще не добавляли игры в избранное.</p>
                        <Button text='В главное меню' onClick={() => navigate('/')} variant='filled' />
                    </div>
                </div>
            ) : (
                <div className={s.items}>
                    {favorites.map((item) => (
                        <CartItem
                            key={item.id}
                            id={item.id}
                            productId={item.productId}
                            title={item.name}
                            edition={item.editionName}
                            additionalInfo={[`Скидка ${item.discount}`]}
                            currentPrice={item.jPrice}
                            oldPrice={item.price}
                            discount={item.discount}
                            img={item.image}
                            isCart={false}
                            discountTime={item.discountTime}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Favourite