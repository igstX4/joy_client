/// <reference types="vite/client" />

interface Window {
    Telegram?: {
        WebApp: {
            initData: string;
            initDataUnsafe: {
                user?: {
                    id: number;
                    first_name: string;
                    last_name?: string;
                    username?: string;
                    language_code?: string;
                };
                start_param?: string;
            };
            colorScheme: 'light' | 'dark';
            close: () => void;
            expand: () => void;
            showAlert: (message: string) => void;
            showConfirm: (message: string) => Promise<boolean>;
            MainButton: {
                show: () => void;
                hide: () => void;
                setText: (text: string) => void;
                onClick: (callback: () => void) => void;
                offClick: (callback: () => void) => void;
                enable: () => void;
                disable: () => void;
            };
            BackButton: {
                show: () => void;
                hide: () => void;
                onClick: (callback: () => void) => void;
                offClick: (callback: () => void) => void;
            };
            version: string;
            isExpanded: boolean;
            isVersionAtLeast: (version: string) => boolean;
            setHeaderColor: (color: string) => void;
            setBackgroundColor: (color: string) => void;
            ready: () => void;
            sendData: (data: string) => void;
        };
    };
}
