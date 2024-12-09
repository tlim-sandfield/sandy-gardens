import me from "@/data/me";
import salnetHoursWorkedList from "@/data/salnetHoursWorkedList";
import IntegerHashMap from "@/types/IntegerHashMap";

export default function getAllNames(hashMap: IntegerHashMap): string[] {
    return salnetHoursWorkedList
        .filter((person) => hashMap[me.resourceID].includes(person.resourceID))
        .map((person: { name: string }) => person.name);
}
