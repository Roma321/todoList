import api from '../api';
export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
    user: {
        id: number;
    }
}

export function auth(): Promise<AuthResponse> {
    return api.post('v1/auth').json();
}

export function refresh(id: string, refreshToken: string): Promise<AuthResponse> {
    return api.post('v1/auth/refresh', {
        json: { id, refreshToken },
    }).json();
}
