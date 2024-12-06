import me from "@/data/me";
import salnetHoursWorkedList from "@/data/salnetHoursWorkedList";
import IntegerHashMap from "@/types/IntegerHashMap";

export default function getNames(hashMap: IntegerHashMap) {
    return salnetHoursWorkedList
        .filter((person) => hashMap[me.resourceID].has(person.resourceID))
        .map((person: { name: string }) => person.name);
}
