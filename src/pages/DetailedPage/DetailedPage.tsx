import { FC, useState, useEffect } from 'react'
import s from './DetailedPage.module.scss'
// import CustomSelect from '../../components/shared/CustomSelect/CustomSelect'
import psplus from '../../assets/images/psplus.png'
import Button from '../../components/ui/button/button'
import { CheckedSvg, JCoin, JPlusCoin, Star } from '../../components/svgs/svgs'
import AttentionModal from '../../components/modals/AttentionModal/AttentionModal'
// import DLCItem from '../../components/shared/DLCItem/DLCItem'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getProductById, addToCart, addToFavorites, removeFromFavorites, getFavorites } from '../../store/slices/productSlice'
import { Loader } from '../../components/ui/Loader/Loader'
import { IProductDetail } from '../../types/product.types'

interface DetailedPageI {
  type: 'games' | 'donate' | 'subscription'
}

const DetailedPage: FC<DetailedPageI> = ({ type }) => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedProduct, isLoading, favorites } = useAppSelector(state => state.product);
  const { user } = useAppSelector(state => state.user);
  const [isModal, setModal] = useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
      dispatch(getFavorites());
    }
  }, [dispatch, productId]);

  // Проверяем наличие продукта в избранном при изменении favorites или selectedProduct
  useEffect(() => {
    if (productId && favorites.length > 0) {
      const isFavorite = favorites.some(item => item.productId === productId);
      setIsInFavorites(isFavorite);
    }
  }, [favorites, productId]);

  const handleAddToCart = async () => {
    if (!productId) return;
    
    try {
      await dispatch(addToCart(productId)).unwrap();
      navigate('/cart');
    } catch (error) {
      console.error('Ошибка добавления в корзину:', error);
    }
  };

  const handleAddToCartClick = () => {
    if (type === 'games' && selectedProduct?.platforms && user?.platform) {
      const userPlatform = user.platform.toLowerCase();
      const productPlatforms = selectedProduct.platforms.toLowerCase().split(',');
      
      if (!productPlatforms.includes(userPlatform)) {
        setModal(true);
      } else {
        handleAddToCart();
      }
    } else {
      handleAddToCart();
    }
  };

  const handleFavoriteClick = async () => {
    if (!productId || isFavoriteLoading) return;
    
    try {
      setIsFavoriteLoading(true);
      if (isInFavorites) {
        await dispatch(removeFromFavorites(productId)).unwrap();
        setIsInFavorites(false);
      } else {
        await dispatch(addToFavorites(productId)).unwrap();
        setIsInFavorites(true);
      }
    } catch (error) {
      console.error('Ошибка работы с избранным:', error);
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  if (!selectedProduct) {
    return <Loader />;
  }

  // if (!selectedProduct) {
  //   return <div>Продукт не найден</div>;
  // }

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const calculateOriginalPrice = () => {
    if (selectedProduct.discountPercent) {
      const discount = parseInt(selectedProduct.discountPercent.replace(/[-%]/g, ''));
      return Math.round(selectedProduct.jPrice / (1 - discount / 100));
    }
    return null;
  };

  const originalPrice = calculateOriginalPrice();

  return (
    <div className={s.detailedPageContainer}>
      {type === 'games' && (
        <AttentionModal 
          isOpen={isModal} 
          onClose={() => setModal(false)} 
          productId={productId}
          productPlatform={selectedProduct.platforms}
        />
      )}
      <div className={s.imgDiv}>
        <img className={s.mainImage} src={selectedProduct.image} alt={selectedProduct.productType} />
        {selectedProduct.geners && selectedProduct.geners.length > 0 && (
          <div className={s.categories}>
            {selectedProduct.geners.map((genre, index) => (
              <div key={index} className={s.category}>{genre}</div>
            ))}
          </div>
        )}
      </div>
      <div className={s.info_items}>
        {selectedProduct.realiseDate && (
          <div className={s.item}>
            <p className={s.label}>Дата выхода</p>
            <p className={s.value}>{formatDate(selectedProduct.realiseDate)}</p>
          </div>
        )}
        <div className={s.item}>
          <p className={s.label}>Тип товара</p>
          <p className={s.value}>{selectedProduct.productType}</p>
        </div>
        {selectedProduct.platforms && (
          <div className={s.item}>
            <p className={s.label}>Платформа</p>
            <p className={s.value}>{selectedProduct.platforms}</p>
          </div>
        )}
        {selectedProduct.languages && (
          <div className={s.item}>
            <p className={s.label}>Поддержка русского языка</p>
            <p className={s.value}>{selectedProduct.languages}</p>
          </div>
        )}
      </div>

      {selectedProduct.subscription && (
        <div className={s.sinfo_wrapper}>
          <div className={s.subscriptionInfo}>
            <img src={psplus} alt="PS Plus" />
            <p>Входит в подписку {selectedProduct.subscription}</p>
          </div>
        </div>
      )}

      {selectedProduct.discount && (
        <div className={s.whatIncludedWrapper}>
          <h2>Скидка действует до:</h2>
          <div className={s.whatIncluded}>
            <div className={s.item}>{formatDate(selectedProduct.discount)}</div>
          </div>
        </div>
      )}

      {selectedProduct.features && (
        <div className={s.whatIncludedWrapper}>
          <h2>Состав издания:</h2>
          <div className={s.whatIncluded}>
            {selectedProduct.features.split('\n').map((feature, index) => (
              <div key={index} className={s.item}>
                <CheckedSvg />{feature}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={s.bottomWrapper}>
        <div className={s.bottomBlock}>
          <div className={s.bottomItem}>
            <Button 
              variant='filled' 
              customStyles={{ width: '49%' }} 
              isChecked={selectedProduct.inCart}
              text={selectedProduct.inCart ? 'В корзине' : 'В корзину'} 
              onClick={handleAddToCartClick}
            />
            <Button 
              variant='empty' 
              customStyles={{ width: '49%', opacity: isFavoriteLoading ? 0.7 : 1 }} 
              icon={<Star />} 
              isChecked={isInFavorites}
              text={isInFavorites ? 'В избранном' : 'В избранное'} 
              onClick={handleFavoriteClick}
              disabled={isFavoriteLoading}
            />
          </div>
          <div className={s.bottomItem}>
            <div className={s.left}>
              <h1>{selectedProduct.jPrice} <JCoin /></h1>
              {originalPrice && <h2>{originalPrice} ₽</h2>}
            </div>
            {selectedProduct.jPlus > 0 && (
              <div className={s.right}>
                <h1>+{selectedProduct.jPlus} <JPlusCoin /></h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailedPage