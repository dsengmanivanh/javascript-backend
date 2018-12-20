import EsdApi from '../api/esd-api';
import TokenStore from '../store/token-store';

class TokenService {

    constructor() {
    }

    handle(query) {
        return this.getToken(query);
    }

    async getToken(query){
        if (TokenStore.get() === undefined) {
            return this.executeAsyncTask(query);
        } else {
            return TokenStore.get()._accessToken;
        }
    }

    async executeAsyncTask () {
        let esdApi = new EsdApi();
        return await esdApi.getToken();
    }
}

module.exports = TokenService;