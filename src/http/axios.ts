import axios from 'axios';

export const API_URL = 'https://dsfqq.ru/api/';
// export const SERVER_URL = 'https://checkplatform.ru';

// const API_URL = 'http://localhost:4000/api';
// export const SERVER_URL = 'http://localhost:4000';
// const API_URL = 'http://138.124.78.106/api';

// Инстанс для клиентских запросов
export const clientApi = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Инстанс для админских запросов
// export const adminApi = axios.create({
//     baseURL: API_URL,
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

// Добавляем initData в каждый запрос
clientApi.interceptors.request.use((config) => {
    return config;
});

// // Интерцептор для админских запросов
// adminApi.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// Добавляем обработку ошибок авторизации
clientApi.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
);

export default clientApi; 
