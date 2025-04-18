import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUserState, IUser, IUpdateUserSettings, IUserResponse } from '../../types/user.types';
import { clientApi } from '../../http/axios';
import Cookies from 'js-cookie';

const initialState: IUserState = {
    user: null,
    isLoading: false,
    error: null,
    isAuth: false
};

// Добавление пользователя через Telegram WebApp
export const addTelegramUser = createAsyncThunk<IUser, string>(
    'user/addTelegram',
    async (tgId, { rejectWithValue }) => {
        try {
            const response = await clientApi.post(`/user/add?tgId=${tgId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка добавления пользователя');
        }
    }
);

// Получение текущего пользователя
export const getCurrentUser = createAsyncThunk<IUser>(
    'user/current',
    async (_, { rejectWithValue }) => {
        try {
            const response = await clientApi.get('/user/current');
            if (response.data?.id === '00000000-0000-0000-0000-000000000000') {
                return rejectWithValue('Пользователь не найден');
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка получения данных пользователя');
        }
    }
);

// Обновление региона пользователя
export const updateUserRegion = createAsyncThunk<IUser, string>(
    'user/updateRegion',
    async (region, { rejectWithValue }) => {
        try {
            const response = await clientApi.post(`/user/region?region=${region}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка обновления региона');
        }
    }
);

// Обновление настроек пользователя
export const updateUserSettings = createAsyncThunk<IUser, string>(
    'user/updateSettings',
    async (queryString, { rejectWithValue }) => {
        try {
            // Отправляем запрос с query параметрами
            const response = await clientApi.put(`/user/setting?${queryString}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка обновления настроек');
        }
    }
);

// Добавляем новый thunk для обновления платформы
export const updateUserPlatform = createAsyncThunk<IUser, string>(
    'user/updatePlatform',
    async (platform, { rejectWithValue }) => {
        try {
            const response = await clientApi.put(`/user/ps-setting?Console=${platform}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка обновления платформы');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuth = !!action.payload;
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuth = false;
            localStorage.removeItem('tgId');
        },
        updateBalance: (state, action) => {
            if (state.user) {
                state.user.jBal = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // Add Telegram User
            .addCase(addTelegramUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addTelegramUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuth = true;
            })
            .addCase(addTelegramUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Get Current User
            .addCase(getCurrentUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuth = true;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.isAuth = false;
            })
            // Update User Region
            .addCase(updateUserRegion.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserRegion.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(updateUserRegion.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Update User Settings
            .addCase(updateUserSettings.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserSettings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(updateUserSettings.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Update User Platform
            .addCase(updateUserPlatform.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserPlatform.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(updateUserPlatform.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
});

export const { setUser, clearUser, updateBalance } = userSlice.actions;
export default userSlice.reducer; 