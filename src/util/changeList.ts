import me from "@/data/me";
import IntegerHashMap from "@/types/IntegerHashMap";

export default function changeList(
    person: number,
    hashMap1: IntegerHashMap, // to remove from
    hashMap2: IntegerHashMap, // to add to
) {
    hashMap2[me.resourceID].push(person);
    const index = hashMap1[person].indexOf(me.resourceID);
    if (index > -1) {
        hashMap1[person].splice(index, 1);
    }
}
