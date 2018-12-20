import EsdApi from '../api/esd-api';
import OfferApi from '../api/offer-api';
import TokenStore from '../store/token-store';
import TokenStoreOld from '../store/token-store-old';

class OfferService {

    constructor() {
    }

    handle(query) {
        if(query.version === 1){
            return this.getOffer(query, TokenStoreOld.get());
        }
        return this.getOffer(query, TokenStore.get());
    }

    async getOffer(query, tokenStore){
        if (tokenStore === undefined) {
            return this.executeAsyncTask(query);
        } else {
            console.log("store=",tokenStore);
            let offerApi = new OfferApi();
            return await offerApi.findByCriteria(query);
        }
    }

    async executeAsyncTask (query) {
        let esdApi = new EsdApi();
        let offerApi = new OfferApi();
        await esdApi.getToken(query.version);
        return await offerApi.findByCriteria(query);

    }
}

module.exports = OfferService;