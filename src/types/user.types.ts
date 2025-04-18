export interface IUser {
    id: string;
    jBal: number;
    jPlus: number;
    email: string | null;
    password: string | null;
    code: string | null;
    platform: string | null;
}

export interface IUserState {
    user: IUser | null;
    isLoading: boolean;
    error: string | null;
    isAuth: boolean;
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface IRegisterData extends ILoginData {
    name: string;
}

export interface IUpdateUserSettings {
    email: string;
    password: string;
    code: string;
    platform: string;
}

export interface IUserResponse {
    user: IUser;
    token: string;
} 