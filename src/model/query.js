class Query{
    constructor(commune = '75101',codeRome = 'D1102',contractType = 'CDI', version = 2){
        this._commune = commune;
        this._codeRome = codeRome;
        this._contractType =contractType;
        this._version = version;
    }

    get commune() {
        return this._commune;
    }

    set commune(value) {
        this._commune = value;
    }

    get codeRome() {
        return this._codeRome;
    }

    set codeRome(value) {
        this._codeRome = value;
    }

    get contractType() {
        return this._contractType;
    }

    set contractType(value) {
        this._contractType = value;
    }


    get version() {
        return this._version;
    }

    set version(value) {
        this._version = value;
    }
}

module.exports = Query;