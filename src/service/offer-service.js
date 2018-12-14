import EsdApi from '../api/esd-api';
import TokenStore from '../api/token-store';

class OfferService {
  
  constructor() {
  }

  handle(filters){
      EsdApi.getToken();
      console.log("store=",TokenStore.get());
  }

}

module.exports = new OfferService();