import React, { useState, useEffect, FC } from 'react';
import styles from './AttentionModal.module.scss';
import Button from '../../ui/button/button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addToCart } from '../../../store/slices/productSlice';

interface AttentionModalProps {
    isOpen: boolean;
    onClose: () => void;
    productId?: string;
    productPlatform?: string;
}

const AttentionModal: FC<AttentionModalProps> = ({ isOpen, onClose, productId, productPlatform }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleConfirm = async () => {
    if (!productId) return;
    
    try {
      await dispatch(addToCart(productId)).unwrap();
      handleClose();
      navigate('/cart');
    } catch (error) {
      console.error('Ошибка добавления в корзину:', error);
    }
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  if (!isOpen) return null;

  return (
    <div className={`${styles.modal} ${isVisible ? styles.open : styles.close}`}>
      <div className={styles.content}>
        <h2>Внимание</h2>
        <p>У Вас в профиле выбрана {user?.platform} как основная платформа. Игра по которой вы перешли доступна только для {productPlatform} и купить ее на {user?.platform} мы не сможем. Пожалуйста, нажмите продолжить и выйдите в главное меню или перейдите в профиль для изменения основной платформы</p>
        <div className={styles.buttons}>
          <Button text='Продолжить' variant='filled' onClick={handleConfirm} />
          <Button text='В профиль' variant='filled' onClick={handleProfile} />
        </div>
      </div>
    </div>
  );
};

export default AttentionModal;