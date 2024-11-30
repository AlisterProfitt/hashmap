/* eslint-disable */
// set method pseudocode
function set(key, value) {
    const bucketIndex = hash(key);
    const newEntry = [key, value];
    if (buckets[bucketIndex] === undefined) {
        const list = new LinkedList();
        list.append(newEntry);
        bucket[bucketIndex] = list;
        return newEntry;
    }

    const listIndex = buckets[bucketIndex].find()

    // if bucket already has item, check if it has our key with list.contains()

    // if contains returns false, list.append(newEntry). Else, overwrite
}
