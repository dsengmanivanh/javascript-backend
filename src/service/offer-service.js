import OfferApi from '../api/offer-api';
import EsdApi from '../api/esd-api';


class OfferService {
  
  constructor() {
  }

  handle(filters){
    const promiseToken = new Promise(function(resolve) {
        const token = EsdApi.getToken();
        if(token){
          resolve(token);
        }
    });
    promiseToken.then( token => {
        console.log("ttt",token);
      //OfferApi.findByCriteriaV1(token);
    });

  }

}

module.exports = new OfferService();