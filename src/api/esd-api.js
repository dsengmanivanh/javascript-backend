import rp from 'request-promise-native';
import TokenStore from '../store/token-store';
import TokenStoreOld from '../store/token-store-old';
import Token from '../store/token';
import config from '../../config';
const timeNow =  new Date(Date.now()).getTime();

class EsdAPI{

    getToken(version){
        if(version === 2){
            if(TokenStore.get() === undefined || TokenStore.get()._accessToken === 0  || timeNow > TokenStore.get()._accessTokenExpirationDate){
                return this.refreshToken(version);
            }
            return TokenStore.get()._accessToken;
        }
        if(TokenStoreOld.get() === undefined || TokenStoreOld.get()._accessToken === 0  || timeNow > TokenStoreOld.get()._accessTokenExpirationDate){
            return this.refreshToken(version);
        }
        return TokenStoreOld.get()._accessToken;
    }


    refreshToken(version) {
        const options = {
            method: 'POST',
            url: config.token.url,
            qs: {realm: '/partenaire'},
            headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            form:
                {
                    grant_type: 'client_credentials',
                    client_id: config.api.client_id,
                    client_secret: config.api.client_secret,
                    scope: config.api.scope
                }
        };
        options.form["scope"] = version === 2 ? config.api.scope : config.api.oldscope;
        options.form["client_id"] = version === 2 ? config.api.client_id : config.api.oldclient_id;
        options.form["client_secret"] = version === 2 ? config.api.client_secret : config.api.oldclient_secret;
        return rp(options)
            .then(function (json) {
                const res = JSON.parse(json);
                const expirationDate = timeNow + res.expires_in;
                let token = new Token(res.access_token,expirationDate);
                version === 2 ? TokenStore.add(token) :TokenStoreOld.add(token);
                return res.access_token;
            })
            .catch(function (err) {
                //console.error("Unable to send message",err);
            });
    }

}

module.exports = EsdAPI;