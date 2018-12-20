class TokenStoreOld {
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

const instance = new TokenStoreOld();
Object.freeze(instance);

module.exports = instance;