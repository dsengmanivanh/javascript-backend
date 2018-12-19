class TokenStore {
    constructor(){
        this._data = [];
    }

    add(item){
        this._data.push(item);
    }

    get(id){
        return this._data.find(d => d.id === id);
    }
}

const instance = new TokenStore();
Object.freeze(instance);

module.exports = instance;