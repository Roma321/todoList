import { BeforeRequestHook } from 'ky';
import { CredentialsHelper } from '../helpers/CredentialHelper';

export const CredentialSetHook: BeforeRequestHook = async request => {
    const inHeaders = request.headers as Headers;
    inHeaders.set('accept', 'application/json');
    if (!request.url.includes('auth')) {
        const accessToken = await CredentialsHelper.getAccessTokenGuaranteed();
        inHeaders.set('Authorization', `Bearer ${accessToken}`);
    }
};
