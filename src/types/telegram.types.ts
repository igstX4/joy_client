declare global {
    interface Window {
        Telegram: {
            WebApp: {
                ready: () => void;
                close: () => void;
                expand: () => void;
                initDataUnsafe: {
                    user?: {
                        id: number;
                        first_name: string;
                        last_name?: string;
                        username?: string;
                        language_code?: string;
                    };
                    query_id?: string;
                };
                initData: string;
                MainButton: {
                    text: string;
                    show: () => void;
                    hide: () => void;
                    onClick: (cb: () => void) => void;
                };
            };
        };
    }
}

export {}; 