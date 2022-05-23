const NodeCache = require("node-cache");

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class cache {

    constructor(ttlSeconds) {
        this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
    }

    get(key) {
        console.log(key, "cache isteniyor")
        const value = this.cache.get(`@cache_${key}`);
        if (value) {
            return ({ status: true, data: value });
        }
        else {
            return ({ status: false });
        }
    }

    set(key, data) {
        console.log(key, "cachelendi")
        this.cache.set(`@cache_${key}`, data);
    }

    flush() {
        this.cache.flushAll();
    }
}

module.exports = {
    sleep,
    cache
}