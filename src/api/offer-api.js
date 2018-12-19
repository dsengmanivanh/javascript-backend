import rp from 'request-promise-native';
import config from '../../config';
import TokenStore from "../store/token-store";

class OfferAPI {

    findByCriteriaV2(query) {
        let options = {
            method: 'GET',
            url: config.offer.url,
            qs:
                {
                    commune: '75101',
                    codeRome:'D1102'
                },
            headers:
                {
                    'Authorization': 'Bearer ',
                    'cache-control': 'no-cache'
                }
        };
        options.headers["Authorization"] = 'Bearer '+ TokenStore.get()._accessToken;
        if(query.contractType !== null ){
            options.qs["typeContrat"] = query.contractType;
        }
        if(query.commune !== null ){
            options.qs["commune"] = query.commune;
        }
        if(query.codeRome !== null ){
            options.qs["codeRome"] = query.codeRome;
        }
        console.log("options=", options);
        return rp(options)
            .then(function (res) {
                return res;
            })
            .catch(function () {
                return "error";
            });
    }
}


module.exports = OfferAPI;