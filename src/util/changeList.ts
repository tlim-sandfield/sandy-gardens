import me from "@/data/me";
import IntegerHashMap from "@/types/IntegerHashMap";

export default function changeList(
    person: number,
    hashMap1: IntegerHashMap,   // to remove from
    hashMap2: IntegerHashMap    // to add to
) {
    hashMap2[me.resourceID].add(person);
    hashMap1[person].remove(me.resourceID);
}
