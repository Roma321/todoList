import ky from 'ky';
import { CredentialSetHook } from './hooks/CredentialSetHook';
import { SERVER_URL } from './constants';

AbortSignal.prototype.throwIfAborted = function () {
    if (this.aborted) {
        throw new AbortSignalError(this.reason ?? 'The operation was aborted.');
    }
};

export default ky.extend({
    prefixUrl: SERVER_URL,
    throwHttpErrors: true,
    hooks: {
        beforeRequest: [
            CredentialSetHook,
        ],
        afterResponse: [async (req, opt, response) => {
            console.log(req.url, response.status, await response.text());
        }],
    },
});
