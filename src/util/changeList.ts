import me from "@/data/me";
import IntegerHashMap from "@/types/IntegerHashMap";

export default function changeList(
    resourceID: number,
    hashMap1: IntegerHashMap,
    hashMap2: IntegerHashMap
) {
    hashMap2[me].push(resourceID);
    delete hashMap1[me][resourceID];
}
