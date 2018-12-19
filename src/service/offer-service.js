import EsdApi from '../api/esd-api';
import OfferApi from '../api/offer-api';
import TokenStore from '../store/token-store';

class OfferService {

    constructor() {
    }

    handle(query) {
        return this.getOffer(query);
    }

    async getOffer(query){
        if (TokenStore.get() === undefined) {
            return this.executeAsyncTask(query);
        } else {
            console.log("store=",TokenStore.get());
            let offerApi = new OfferApi();
            const offers = await offerApi.findByCriteriaV2(query);
            return JSON.parse(offers);
        }
    }

    async executeAsyncTask (query) {
        let esdApi = new EsdApi();
        let offerApi = new OfferApi();
        const token= await esdApi.getToken();
        const offers = await offerApi.findByCriteriaV2(query);
        return JSON.parse(offers);

    }
}

module.exports = OfferService;