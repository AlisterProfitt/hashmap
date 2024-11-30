class HashMap {
    constructor(capacity = 16, loadFactor = 0) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set(key, value) {

    }
}

const test = new HashMap;
console.log(test.hash('alister'));

export { HashMap };