export interface User {
    id?: number;
    username: string;
    password?: string;
    role?: string;
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    status?: string;
    enabled?: boolean;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    type: string;
    username: string;
    authorities: Authority[];
}

export interface Authority {
    authority: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
    role: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    status: string;
}