import rp from 'request-promise-native';
import TokenStore from './token-store';
import Token from './token';

class EsdAPI{

    getToken(){
        this.refreshToken();
    }

    refreshToken() {
        const options = {
            method: 'POST',
            url: 'https://entreprise.pole-emploi.fr/connexion/oauth2/access_token',
            qs: {realm: '/partenaire'},
            headers:
                {
                    'Postman-Token': '5362033c-799e-42ce-b234-4096d7ec6cd8',
                    'cache-control': 'no-cache',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            form:
                {
                    grant_type: 'client_credentials',
                    client_id: 'PAR_innooffresv2_e490bf36c97ce99c856eae96e44b68ed2aee3afb59ffb84b9625a322c1510895',
                    client_secret: 'ed576963ceafdb097ddc085496a966754c6f28ffa1906da4e8cdb751e23dd650',
                    scope: 'api_offresdemploiv2 application_PAR_innooffresv2_e490bf36c97ce99c856eae96e44b68ed2aee3afb59ffb84b9625a322c1510895 o2dsoffre'
                }
        };
        rp(options)
            .then(function (json) {
                const res = JSON.parse(json);
                const timeNow =  new Date(Date.now()).getTime();
                const expirationDate = timeNow + res.expires_in;
                if(TokenStore.get() === undefined || TokenStore.get()._accessToken === 0  || expirationDate > TokenStore.get()._accessTokenExpirationDate){
                    let token = new Token(res.access_token,expirationDate);
                    TokenStore.add(token);
                }
            })
            .catch(function (err) {
                console.error("Unable to send message",err);
            });
    }
}


module.exports = EsdAPI;