export interface IProduct {
    productId: string;
    imageFilepath: string;
    name: string;
    price: number;
    jprice: number;
    discount: string;
    realiseDate?: string;
    productType?: string;
    platforms?: string;
    languages?: string;
    subscription?: string;
    features?: string;
    geners?: string[];
    inCart?: boolean;
    inFavorite?: boolean;
    image?: string;
    jPlus?: number;
}

export interface IProductDetail {
    productId: string;
    productType: string;
    image: string;
    geners: string[];
    realiseDate: string;
    platforms: string;
    languages: string;
    subscription: string | null;
    discount: string;
    features: string | null;
    price: number;
    jPrice: number;
    jPlus: number;
    discountPercent: string;
    inCart: boolean;
    inFavorite: boolean;
    isPlatform: boolean;
}

export interface ISection {
    name: string;
    editions: IProduct[];
}

export interface ISubscription {
    productId: string;
    imagePath: string;
    name: string;
    jprice: number;
    price: number;
    discount: string;
    sectionName: string;
}

export interface ICartItem {
    id: string;
    productId: string;
    image: string;
    name: string;
    editionName: string;
    price: number;
    jPrice: number;
    discount: string;
    platform: string;
}

export interface ICart {
    items: ICartItem[];
    email: string;
    password: string;
    code: string;
    payEmail: string;
}

export interface IProductState {
    products: IProduct[];
    sections: ISection[];
    subscriptions: ISubscription[];
    isLoading: boolean;
    error: string | null;
    selectedProduct: IProductDetail | null;
    cart: ICart;
}