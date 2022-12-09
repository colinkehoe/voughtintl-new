const fetch = require('node-fetch');

class Util {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    static fetchJSON(url) {
        return new Promise(async (resolve, reject) => {
            if (!url || typeof(url) !== 'string') reject('Invalid URL');
            
            try {
                const result = await fetch(url);
                const json = await result.json();
                resolve(json);
            }
            catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = Util;