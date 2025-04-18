import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { clientApi } from '../../http/axios';
import { IProduct, ISection, ISubscription, IProductDetail, ICart } from '../../types/product.types';
import { PayloadAction } from '@reduxjs/toolkit';

interface INews {
    id: string;
    title: string;
    description: string;
    image: string;
    date: string;
}

interface IDonationItem {
    amount: number;
}

interface IFavoriteItem {
    id: string;
    productId: string;
    name: string;
    editionName: string;
    image: string;
    price: number;
    jPrice: number;
    discount: string;
    inCart: boolean;
    discountTime?: string;
}

interface ProductState {
    products: IProduct[];
    sections: ISection[];
    subscriptions: ISubscription[];
    isLoading: boolean;
    error: string | null;
    selectedProduct: IProductDetail | null;
    cart: ICart;
    favorites: IFavoriteItem[];
    news: INews[];
    joyDonations: number[];
    joyPlusDonations: number[];
}

const initialState: ProductState = {
    products: [],
    sections: [],
    subscriptions: [],
    isLoading: false,
    error: null,
    selectedProduct: null,
    cart: {
        items: [],
        email: '',
        password: '',
        code: '',
        payEmail: ''
    },
    favorites: [],
    news: [],
    joyDonations: [],
    joyPlusDonations: []
};

export const fetchProducts = createAsyncThunk<IProduct[]>(
    'products/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await clientApi.get('/products');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки продуктов');
        }
    }
);

export const fetchProductById = createAsyncThunk<IProduct, number>(
    'products/fetchOne',
    async (id, { rejectWithValue }) => {
        try {
            const response = await clientApi.get(`/products/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки продукта');
        }
    }
);

export const getGameLayout = createAsyncThunk<ISection[]>(
    'product/getLayout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await clientApi.get('/game/layout');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка получения данных');
        }
    }
);

export const getSubscriptions = createAsyncThunk<ISubscription[]>(
    'product/getSubscriptions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await clientApi.get('/layout');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка получения подписок');
        }
    }
);

export const getProductById = createAsyncThunk<IProductDetail, string>(
    'product/getById',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await clientApi.get(`/product/productById?ProductId=${productId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка получения продукта');
        }
    }
);

export const getCart = createAsyncThunk<ICart>(
    'product/getCart',
    async (_, { rejectWithValue }) => {
        try {
            const response = await clientApi.get('/cart/by-user');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка получения корзины');
        }
    }
);

export const addToCart = createAsyncThunk<void, string>(
    'product/addToCart',
    async (productId, { rejectWithValue, dispatch }) => {
        try {
            await clientApi.put(`/cart/add-item?productId=${productId}`);
            dispatch(getCart());
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка добавления в корзину');
        }
    }
);

export const removeFromCart = createAsyncThunk<void, string>(
    'product/removeFromCart',
    async (productId, { rejectWithValue, dispatch }) => {
        try {
            await clientApi.delete(`/cart/remove-item?productId=${productId}`);
            dispatch(getCart());
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка удаления из корзины');
        }
    }
);

interface UpdateCartFieldPayload {
    field: 'email' | 'password' | 'code' | 'payEmail';
    value: string;
}

export const getFavorites = createAsyncThunk<IFavoriteItem[]>(
    'product/getFavorites',
    async (_, { rejectWithValue }) => {
        try {
            const response = await clientApi.get('/favorite/by-user');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка получения избранного');
        }
    }
);

export const addToFavorites = createAsyncThunk<IFavoriteItem, string>(
    'product/addToFavorites',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await clientApi.put(`/favorite/add-item?productId=${productId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка добавления в избранное');
        }
    }
);

export const removeFromFavorites = createAsyncThunk<{ productId: string }, string>(
    'product/removeFromFavorites',
    async (productId, { rejectWithValue }) => {
        try {
            await clientApi.delete(`/favorite/remove-item?productId=${productId}`);
            return { productId };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка удаления из избранного');
        }
    }
);

export const getNews = createAsyncThunk<INews[]>(
    'product/getNews',
    async (_, { rejectWithValue }) => {
        try {
            const response = await clientApi.get('/news/board');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка получения новостей');
        }
    }
);

export const getJoyDonations = createAsyncThunk<number[]>(
    'product/getJoyDonations',
    async (_, { rejectWithValue }) => {
        try {
            const response = await clientApi.get('api/Transaction/GetJoyDonat');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка получения списка Joy');
        }
    }
);

export const getJoyPlusDonations = createAsyncThunk<number[]>(
    'product/getJoyPlusDonations',
    async (_, { rejectWithValue }) => {
        try {
            const response = await clientApi.get('api/Transaction/GetJoyPlusDonat');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка получения списка Joy+');
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        updateCartField: (state, action: PayloadAction<UpdateCartFieldPayload>) => {
            state.cart[action.payload.field] = action.payload.value;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch All Products
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Fetch Single Product
            .addCase(fetchProductById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Get Game Layout
            .addCase(getGameLayout.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getGameLayout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.sections = action.payload;
            })
            .addCase(getGameLayout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(getSubscriptions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getSubscriptions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.subscriptions = action.payload;
            })
            .addCase(getSubscriptions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(getProductById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(getCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(addToCart.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(removeFromCart.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(getFavorites.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getFavorites.fulfilled, (state, action) => {
                state.isLoading = false;
                state.favorites = action.payload;
            })
            .addCase(getFavorites.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(addToFavorites.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addToFavorites.fulfilled, (state, action) => {
                state.isLoading = false;
                state.favorites.push(action.payload);
            })
            .addCase(addToFavorites.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(removeFromFavorites.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(removeFromFavorites.fulfilled, (state, action) => {
                state.isLoading = false;
                state.favorites = state.favorites.filter(item => item.productId !== action.payload.productId);
            })
            .addCase(removeFromFavorites.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(getNews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getNews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.news = action.payload;
            })
            .addCase(getNews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(getJoyDonations.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getJoyDonations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.joyDonations = action.payload;
            })
            .addCase(getJoyDonations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(getJoyPlusDonations.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getJoyPlusDonations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.joyPlusDonations = action.payload;
            })
            .addCase(getJoyPlusDonations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
});

export const { updateCartField } = productSlice.actions;
export default productSlice.reducer; 