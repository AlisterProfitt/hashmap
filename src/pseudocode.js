/* eslint-disable */
// set method pseudocode
// function set(key, value) {
//     const bucketIndex = hash(key);
//     const newEntry = [key, value];
//     const this.buckets[bucketIndex] = list;
//     if (list === undefined) {
//         const list = new LinkedList();
//         list.append(newEntry);
//         bucket[bucketIndex] = list;
//         return newEntry;
//     }

//     const listIndex = list.find(key)
//     if (listIndex >= 0) {
//         list.removeAt(listIndex);
//         list.insertAt(newEntry, listIndex);
//     } else {
//         list.append(newEntry);
//     }

    // if bucket already has item, check if it has our key with list.contains()

    // if contains returns false, list.append(newEntry). Else, overwrite
// }
