import { LinkedList } from "./linkedListConstructor.mjs";

class HashMap {
    constructor(capacity = 16, loadFactor = 0.75) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.numberOfElements = 0;
        this.buckets = new Array(capacity);
    }

    checkLoad() {
        if ((this.numberOfElements / this.capacity) >= this.loadFactor) {
            return true;
        } else {
            return false;
        }
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
        const bucketIndex = this.hash(key);
        if (bucketIndex < 0 || bucketIndex >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        const newEntry = [key, value];
        let potentialList = this.buckets[bucketIndex];
        if (potentialList === undefined) {
            const list = new LinkedList();
            list.append(newEntry);
            this.buckets[bucketIndex] = list;
            this.numberOfElements++;
            this.checkLoad();
            return newEntry;
        }

        const listIndex = potentialList.find(key)
        if (listIndex >= 0) {
            potentialList.removeAt(listIndex);
            potentialList.insertAt(newEntry, listIndex);
        } else {
            potentialList.append(newEntry);
            this.numberOfElements++;
            // check if load > loadFactor. If it is, double buckets, presumably with the concat method
            this.checkLoad();
        }
        return newEntry
    }

    get(key) {
        const bucketIndex = this.hash(key);
        if (bucketIndex < 0 || bucketIndex >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (this.buckets[bucketIndex] !== undefined) {    
            const valueIndex = this.buckets[bucketIndex].find(key);
            if (valueIndex < 0) return null;
            return this.buckets[bucketIndex].at(valueIndex).value[1];
        }
        return null;
    }

    has(key) {
        const bucketIndex = this.hash(key);
        let boolean = false;
        if (bucketIndex < 0 || bucketIndex >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (this.buckets[bucketIndex] !== undefined) {    
            const valueIndex = this.buckets[bucketIndex].find(key);
            if (valueIndex >= 0) {
                boolean = true;
            }
        }
        return boolean;
    }

    remove(key) {
        const bucketIndex = this.hash(key);
        let boolean = false;
        if (bucketIndex < 0 || bucketIndex >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (this.has(key)) {
            const keyIndex = this.buckets[bucketIndex].find(key);
            this.buckets[bucketIndex].removeAt(keyIndex);
            this.numberOfElements--;
            boolean = true;
        }

        return boolean;
    }

    length() {
        return this.numberOfElements;
    }

    clear() {
        this.capacity = 16;
        this.numberOfElements = 0;
        this.buckets = new Array(16);
    }

    keys() {
        const keysContainer = [];
        for (let i = 0; i < this.capacity; i++) {
            if (this.buckets[i] !== undefined) {
                const keysArray = this.buckets[i].toKeys();
                console.log(keysArray);
                keysContainer.push(keysArray);
            }
        }
        
        return keysContainer.flat(1);
    }
}

const test = new HashMap;
test.set('alister', 'biggus');
test.set('joe', 'osteen')
test.set('joel', 'osteen')
test.set('blue', 'bella')
test.set('alister', 'smallus')
console.log(test.get('alister'));
console.log(test.length());
console.log(test.keys());



export { HashMap };