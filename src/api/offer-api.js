import rp from 'request-promise-native';
import config from '../../config';
import TokenStore from "../store/token-store";
import TokenStoreOld from "../store/token-store-old";

class OfferAPI {

    findByCriteria(query) {
        return query.version === 2 ? this.findByCriteriaV2(query) : this.findByCriteriaV1(query);
    }

    findByCriteriaV2(query) {
        let options = {
            method: 'GET',
            url: config.offer.url,
            qs:
                {
                    typeContrat: 'CDI',
                    codeRome: 'D1102',
                    commune: '75101'
                },
            headers:
                {
                    'Authorization': 'Bearer ',
                    'cache-control': 'no-cache'
                }
        };
        options.headers["Authorization"] = 'Bearer ' + TokenStore.get()._accessToken;
        if (query.contractType !== null) {
            options.qs["typeContrat"] = query.contractType;
        }
        if (query.commune !== null) {
            options.qs["commune"] = query.commune;
        }
        if (query.codeRome !== null) {
            options.qs["codeRome"] = query.codeRome;
        }
        console.log("v2=",options);
        return rp(options)
            .then(function (res) {
                return res;
            })
            .catch(function () {
                return "error";
            });
    }

    findByCriteriaV1(query) {

        let options = {
            method: 'POST',
            url: config.offer.oldurl,
            headers:
                {
                    'cache-control': 'no-cache',
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '
                },
            body:
                {
                    technicalParameters: {
                        page: 1,
                        per_page: 150,
                        sort: 1
                    },
                    criterias: {
                        contractTypeCode: 'CDD',
                        cityCode: '89420',
                        romeProfessionCardCode: 'D1102'
                    }
                },
            json: true
        };

        options.headers["Authorization"] = 'Bearer ' + TokenStoreOld.get()._accessToken;
        if (query.contractType !== null) {
            options.body.criterias["contractTypeCode"] = query.contractType;
        }
        if (query.commune !== null) {
            options.body.criterias["cityCode"] = query.commune;
        }
        if (query.codeRome !== null) {
            options.body.criterias["romeProfessionCardCode"] = query.codeRome;
        }
        console.log("v1=",options);
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