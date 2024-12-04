import me from "@/data/me";
import salnetHoursWorkedList from "@/data/salnetHoursWorkedList";
import IntegerHashMap from "@/types/IntegerHashMap";

export default function getNames(list: IntegerHashMap) {
    return salnetHoursWorkedList
        .filter((person) => list[me]?.includes(person.resourceID))
        .map((person) => person.name);
}
