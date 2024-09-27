import ky from 'ky';
import { CredentialSetHook } from './hooks/CredentialSetHook';
import { SERVER_URL } from './constants';

export default ky.extend({
    prefixUrl: SERVER_URL,
    throwHttpErrors: true,
    hooks: {
        beforeRequest: [
            CredentialSetHook,
        ],
        afterResponse: [],
    },
});
