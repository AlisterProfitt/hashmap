import { LinkedList } from "./linkedListConstructor.mjs";

class HashMap {
    constructor(capacity = 16, loadFactor = 0.75) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.numberOfElements = 0;
        this.buckets = new Array(capacity);
    }

    isOverLoad() {
        if ((this.numberOfElements / this.capacity) > this.loadFactor) {
            return true;
        } else {
            return false;
        }
    }

    checkLoad() {
        return this.numberOfElements / this.capacity
    }

    doubleCapacity() {
        const oldBuckets = [...this.buckets];
        this.capacity *= 2;
        this.buckets = new Array(this.capacity);
        this.reHash(oldBuckets);
    }

    reHash(array) {
        this.numberOfElements = 0;
        array.forEach((bucket) => {
            if (bucket) {
                const entries = bucket.toEntries();
                entries.forEach((entry) => {
                    this.set(entry[0], entry[1]);
                })
            }
        })
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
            if (this.isOverLoad()) {
                this.doubleCapacity();
            }
            return newEntry;
        }

        const listIndex = potentialList.find(key)
        if (listIndex >= 0) {
            potentialList.removeAt(listIndex);
            potentialList.insertAt(newEntry, listIndex);
        } else {
            potentialList.append(newEntry);
            this.numberOfElements++;
            if (this.isOverLoad()) {
                this.doubleCapacity();
            }
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
            if (this.buckets[bucketIndex].size() === 0) {
                delete this.buckets[bucketIndex]
            }
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
                keysContainer.push(keysArray);
            }
        }
        
        return keysContainer.flat(1);
    }

    values() {
        const valuesContainer = [];
        for (let i = 0; i < this.capacity; i++) {
            if (this.buckets[i] !== undefined) {
                const valuesArray = this.buckets[i].toValues();
                valuesContainer.push(valuesArray);
            }
        }
        
        return valuesContainer.flat(1);
    }

    entries() {
        const entriesContainer = [];
        for (let i = 0; i < this.capacity; i++) {
            if (this.buckets[i] !== undefined) {
                const entriesArray = this.buckets[i].toEntries();
                entriesContainer.push(entriesArray);
            }
        }
        
        return entriesContainer.flat(1);
    }
}

export { HashMap };