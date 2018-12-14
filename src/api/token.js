class Token{
    constructor(accessToken = 0,accessTokenExpirationDate = new Date(Date.now()).getTime()){
        this._accessToken = accessToken;
        this._accessTokenExpirationDate = accessTokenExpirationDate;
    }
}

module.exports = Token;