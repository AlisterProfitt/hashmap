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
            return newEntry;
        }

        const listIndex = potentialList.find(key)
        if (listIndex >= 0) {
            potentialList.removeAt(listIndex);
            potentialList.insertAt(newEntry, listIndex);
        } else {
            potentialList.append(newEntry);
        }
        return newEntry
    }
}

const test = new HashMap;
test.set('alister', 'biggus');
test.set('joe', 'osteen')
test.set('joel', 'osteen')
test.set('alister', 'smallus')
console.log(test.buckets[12]);

export { HashMap };