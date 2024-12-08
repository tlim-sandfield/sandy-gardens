import IntegerHashMap from "@/types/IntegerHashMap";
import salnetHoursWorkedList from "./salnetHoursWorkedList";

const neighboursHashMap: IntegerHashMap = new IntegerHashMap();

for (let i = 0; i < salnetHoursWorkedList.length; i++) {
    neighboursHashMap[salnetHoursWorkedList[i].resourceID] = new Array<number>();
}

export default neighboursHashMap;
