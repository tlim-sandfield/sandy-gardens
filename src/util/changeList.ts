import me from "@/data/me";
import IntegerHashMap from "@/types/IntegerHashMap";

export default function changeList(
    person: number,
    hashMap1: IntegerHashMap,
    hashMap2: IntegerHashMap
) {
    hashMap2[me].push(person);
    delete hashMap1[person][me];
}
