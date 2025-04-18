import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { clientApi } from '../../http/axios';

interface ICatalogProduct {
    productId: string;
    name: string;
    imageFilepath: string;
    price: number;
    jprice: number;
    discount?: string;
    platform: string;
}

interface ICatalogState {
    products: ICatalogProduct[];
    isLoading: boolean;
    error: string | null;
    hasMore: boolean;
    filters: {
        page: number;
        name?: string;
        platform?: string;
        byDesc: boolean;
        byDiscount: boolean;
        filterName: string;
        minPrice?: number;
        maxPrice?: number;
        sortBy?: 'price' | 'date' | 'popular';
    };
}

const initialState: ICatalogState = {
    products: [],
    isLoading: false,
    error: null,
    hasMore: true,
    filters: {
        page: 0,
        byDesc: false,
        byDiscount: false,
        filterName: ''
    }
};

export const fetchCatalogProducts = createAsyncThunk(
    'catalog/fetchProducts',
    async (params: { 
        page?: number;
        name?: string;
        platform?: string;
        byDesc?: boolean;
        byDiscount?: boolean;
        filterName?: string;
        minPrice?: number;
        maxPrice?: number;
        isNewSearch?: boolean;
    }, { rejectWithValue }) => {
        try {
            const queryParams = new URLSearchParams();
            
            // Добавляем обязательные параметры
            queryParams.append('byDesc', String(params.byDesc ?? false));
            queryParams.append('byDiscount', String(params.byDiscount ?? false));
            queryParams.append('Page', String(params.page ?? 0));
            
            // Добавляем опциональные параметры
            if (params.name) queryParams.append('Name', params.name);
            if (params.platform) queryParams.append('Platform', params.platform);
            if (params.filterName) queryParams.append('FilterName', params.filterName);
            if (typeof params.minPrice === 'number') queryParams.append('MinPrice', String(params.minPrice));
            if (typeof params.maxPrice === 'number') queryParams.append('MaxPrice', String(params.maxPrice));

            const response = await clientApi.post(`/product/filter?${queryParams.toString()}`);
            
            return {
                products: response.data,
                isNewSearch: params.isNewSearch
            };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки продуктов');
        }
    }
);

export const updateFilters = createAsyncThunk(
    'catalog/updateFilters',
    async (filters: Partial<ICatalogState['filters']>) => {
        return filters;
    }
);

const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCatalogProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCatalogProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.isNewSearch) {
                    state.products = action.payload.products;
                } else {
                    state.products = [...state.products, ...action.payload.products];
                }
                state.hasMore = action.payload.products.length > 0;
            })
            .addCase(fetchCatalogProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(updateFilters.fulfilled, (state, action) => {
                state.filters = {
                    ...state.filters,
                    ...action.payload
                };
            });
    }
});

export default catalogSlice.reducer; 