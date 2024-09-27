import Storage from 'react-native-encrypted-storage';
import { auth, AuthResponse, refresh } from '../requests/auth';
import { ACCESS_TOKEN_DURATION_MILLISEC } from '../constants';

const ACCESS_TOKEN = 'access';
const REFRESH_TOKEN = 'refresh';
const EXPIRATION_TIME = 'expires';
const USER_ID = 'userId';

export class CredentialsHelper {
    static async getAccessTokenGuaranteed() {
        if (await this.isAuthorised()) {
            return Storage.getItem(ACCESS_TOKEN);
        }
        const refreshToken = await this.getRefreshToken();
        const userId = await this.getUserId();
        if (refreshToken && userId) {
            const refreshResponse = await refresh(userId, refreshToken);
            this.saveCredentials(refreshResponse);
            return refreshResponse.accessToken;
        }
        const authResponse = await auth();
        this.saveCredentials(authResponse);
        return authResponse.accessToken;
    }

    private static getRefreshToken() {
        return Storage.getItem(REFRESH_TOKEN);
    }

    private static getAccessToken() {
        return Storage.getItem(REFRESH_TOKEN);
    }

    private static getUserId() {
        return Storage.getItem(USER_ID);
    }

    static async isAuthorised() {
        return await this.getAccessToken() && !(await this.isExpired());
    }

    static async isExpired() {
        const expiresIn = await Storage.getItem(EXPIRATION_TIME);
        if (!expiresIn) {
            return true;
        }
        return +expiresIn <= new Date().getTime();
    }

    private static saveCredentials(dto: AuthResponse) {
        Storage.setItem(REFRESH_TOKEN, dto.refreshToken);
        Storage.setItem(ACCESS_TOKEN, dto.accessToken);
        Storage.setItem(USER_ID, dto.user.id.toString());
        const now = new Date().getTime();
        Storage.setItem(EXPIRATION_TIME, (now + ACCESS_TOKEN_DURATION_MILLISEC).toString());
    }
}
