import salnetHoursWorkedList from "@/data/salnetHoursWorkedList";

export default function nameToID(name: string) {
    return salnetHoursWorkedList.find((person) => person.name === name)
        ?.resourceID;
}
