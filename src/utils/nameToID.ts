import salnetHoursWorkedList from "@/data/salnetHoursWorkedList";

export default function nameToID(name: string): number {
    return (
        salnetHoursWorkedList.find((person) => person.name === name)
            ?.resourceID ?? 0
    );
}
