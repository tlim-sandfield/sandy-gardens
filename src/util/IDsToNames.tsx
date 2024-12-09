import salnetHoursWorkedList from "@/data/salnetHoursWorkedList";

export default function IDsToNames(list: number[] | undefined): string[] {
    const names = (list ?? []).map((id) => {
        return salnetHoursWorkedList.find((person) => person.resourceID === id)
            ?.name;
    });
    return names.filter((name) => name !== undefined) as string[];
}
