import rp from 'request-promise-native';
import TokenStore from '../store/token-store';
import Token from '../store/token';
import config from '../../config';
const timeNow =  new Date(Date.now()).getTime();

class EsdAPI{

    getToken(){
        if(TokenStore.get() === undefined || TokenStore.get()._accessToken === 0  || timeNow > TokenStore.get()._accessTokenExpirationDate){
            return this.refreshToken();
        }
        return TokenStore.get()._accessToken;
    }


    refreshToken() {
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
        return rp(options)
            .then(function (json) {
                const res = JSON.parse(json);
                const expirationDate = timeNow + res.expires_in;
                let token = new Token(res.access_token,expirationDate);
                TokenStore.add(token);
                return res.access_token;
            })
            .catch(function (err) {
                console.error("Unable to send message",err);
            });
    }
}


module.exports = EsdAPI;