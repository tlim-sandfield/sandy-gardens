import { useNeighbours } from "@/contexts/NeighboursContext";
import me from "@/data/me";
import salnetHoursWorkedList from "@/data/salnetHoursWorkedList";

export default function removeMeAndCurrentNeighbours(): string[] {
    const currentNeighbours = useNeighbours();

    const allNamesExceptMe = salnetHoursWorkedList.filter(
        (person) => person.resourceID !== me.resourceID
    );

    const allAddableNames = allNamesExceptMe.filter(
        (person) =>
            !currentNeighbours?.[me.resourceID]?.includes(person.resourceID)
    );

    return allAddableNames.map((person) => person.name);
}
