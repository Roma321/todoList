import api from '../api';
export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
    user: {
        id: number;
    }
}

export function auth() {
    return api.post('v1/auth').json<AuthResponse>();
}

export function refresh(id: string, refreshToken: string) {
    return api.post('v1/auth/refresh', {
        json: { id, refreshToken },
    }).json<AuthResponse>();
}
