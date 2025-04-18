import { useEffect, useState } from 'react';

interface TelegramUser {
    id: number;
    first_name: string;
    username?: string;
    last_name?: string;
    language_code?: string;
    is_premium?: boolean;
}

interface TelegramWebApp {
    ready: () => void;
    close: () => void;
    expand: () => void;
    initDataUnsafe?: {
        user?: TelegramUser;
        query_id?: string;
    };
    MainButton: {
        text: string;
        show: () => void;
        hide: () => void;
        onClick: (callback: () => void) => void;
        setText: (text: string) => void;
        enable: () => void;
        disable: () => void;
    };
    colorScheme?: 'light' | 'dark';
}

export const sendToBot = (message: string, component: string = 'useTelegram') => {
    try {
        fetch(`https://api.telegram.org/bot7237603886:AAFDliWze4bVrN0OVE8Nz5T7ZDACrGL-vFM/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: 964787386,
                text: `[WebApp Log] [${component}]\n${message}\nPlatform: ${navigator.platform}\nUserAgent: ${navigator.userAgent}`
            })
        });
    } catch (e) {
        console.error('Error sending log to bot:', e);
    }
};

export function useTelegram() {
    const [user, setUser] = useState<TelegramUser | null>(null);
    const [queryId, setQueryId] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        let attempts = 0;
        const maxAttempts = 5;
        const checkInterval = 500; // 500ms

        const checkTelegramWebApp = () => {
            if (window.Telegram?.WebApp) {
                const tg = window.Telegram.WebApp;
                try {
                    tg.ready();
                    sendToBot('tg.ready() успешно вызван');
                    
                    const userData = tg.initDataUnsafe?.user || null;
                    const query = (tg.initDataUnsafe as any)?.query_id || null;

                    setUser(userData);
                    setQueryId(query);
                    setIsInitialized(true);

                    // Устанавливаем тему в зависимости от colorScheme
                    if (tg.colorScheme === 'dark') {
                        document.documentElement.setAttribute('data-theme', 'dark');
                        setIsDarkTheme(true);
                    } else {
                        document.documentElement.setAttribute('data-theme', 'light');
                        setIsDarkTheme(false);
                    }

                    sendToBot(`User: ${JSON.stringify(userData)}\nQuery ID: ${query}\nTheme: ${tg.colorScheme}`);
                } catch (e: any) {
                    sendToBot(`Ошибка при вызове tg.ready(): ${e.message}`);
                }
            } else {
                attempts++;
                if (attempts < maxAttempts) {
                    sendToBot(`Попытка ${attempts}: Telegram WebApp не найден, повторная попытка через ${checkInterval}ms`);
                    setTimeout(checkTelegramWebApp, checkInterval);
                } else {
                    sendToBot('Telegram WebApp не найден после всех попыток');
                }
            }
        };

        checkTelegramWebApp();
    }, []);

    return {
        tg: window.Telegram?.WebApp || null,
        user,
        queryId,
        isInitialized,
        isDarkTheme
    };
}

// Добавляем функцию для установки темы в документе
export const setTheme = (theme: 'dark' | 'light') => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
}

// Добавляем код для определения темы Telegram и установки соответствующей темы в приложении
export const initTheme = () => {
    const tg = window.Telegram?.WebApp;
    
    if (tg) {
        // Получаем тему из Telegram
        const isInDarkMode = tg.colorScheme === 'dark';
        setTheme(isInDarkMode ? 'dark' : 'light');
    } else {
        // Если Telegram недоступен, используем сохраненную тему или системную
        const savedTheme = localStorage.getItem('app-theme');
        if (savedTheme) {
            setTheme(savedTheme as 'dark' | 'light');
        } else {
            // Используем системную настройку
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        }
    }
}

// Функция для переключения темы
export const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    return newTheme;
}
