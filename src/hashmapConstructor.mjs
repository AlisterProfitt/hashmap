import { LinkedList } from "./linkedListConstructor.mjs";

class HashMap {
    constructor(capacity = 16, loadFactor = 0) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.buckets = new Array(capacity);
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
console.log(test.buckets[3]);

export { HashMap };