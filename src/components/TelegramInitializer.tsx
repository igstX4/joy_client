import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addTelegramUser, getCurrentUser } from '../store/slices/userSlice';
import { useTelegram, sendToBot } from '../hooks/useTelegram';

// Функция для проверки, является ли пользователь пустым
const isEmptyUser = (user: any) => {
    return user?.id === '00000000-0000-0000-0000-000000000000' && 
           user?.jBal === 0 && 
           user?.jPlus === 0 && 
           !user?.platform;
};

export const TelegramInitializer = () => {
    const dispatch = useAppDispatch();
    const { user: tgUser, isInitialized } = useTelegram();

    useEffect(() => {
        if (!isInitialized) {
            sendToBot('Ожидание инициализации Telegram WebApp', 'TelegramInitializer');
            return;
        }

        if (!tgUser?.id) {
            const error = 'Telegram user data not available';
            console.error(error);
            sendToBot(error, 'TelegramInitializer');
            return;
        }

        const tgId = tgUser.id.toString();
        
        try {
            const storedTgId = localStorage.getItem('tgId');

            if (!storedTgId) {
                sendToBot(`Начало регистрации нового пользователя: ${tgId}`, 'TelegramInitializer');
                dispatch(addTelegramUser(tgId))
                    .unwrap()
                    .then(() => {
                        try {
                            localStorage.setItem('tgId', tgId);
                            sendToBot(`Пользователь успешно зарегистрирован: ${tgId}`, 'TelegramInitializer');
                        } catch (e) {
                            const error = `Error saving to localStorage: ${e}`;
                            console.error(error);
                            sendToBot(error, 'TelegramInitializer');
                        }
                    })
                    .catch((error) => {
                        const errorMessage = `Error adding Telegram user: ${error}`;
                        console.error(errorMessage);
                        sendToBot(errorMessage, 'TelegramInitializer');
                    });
            } else {
                sendToBot(`Получение данных существующего пользователя: ${tgId}`, 'TelegramInitializer');
                dispatch(getCurrentUser())
                    .unwrap()
                    .catch(() => {
                        sendToBot(`Пользователь не найден, попытка регистрации: ${tgId}`, 'TelegramInitializer');
                        dispatch(addTelegramUser(tgId))
                            .unwrap()
                            .then(() => {
                                try {
                                    localStorage.setItem('tgId', tgId);
                                    sendToBot(`Пользователь успешно зарегистрирован: ${tgId}`, 'TelegramInitializer');
                                } catch (e) {
                                    const error = `Error saving to localStorage: ${e}`;
                                    console.error(error);
                                    sendToBot(error, 'TelegramInitializer');
                                }
                            })
                            .catch((error) => {
                                const errorMessage = `Error adding Telegram user: ${error}`;
                                console.error(errorMessage);
                                sendToBot(errorMessage, 'TelegramInitializer');
                            });
                    });
            }
        } catch (e) {
            const error = `Error in TelegramInitializer: ${e}`;
            console.error(error);
            sendToBot(error, 'TelegramInitializer');
        }
    }, [dispatch, tgUser, isInitialized]);

    return null;
}; 