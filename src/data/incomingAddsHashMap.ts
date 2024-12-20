import IntegerHashMap from "@/types/IntegerHashMap";
import salnetHoursWorkedList from "./salnetHoursWorkedList";

const incomingAddsHashMap: IntegerHashMap = new IntegerHashMap();

for (let i = 0; i < salnetHoursWorkedList.length; i++) {
    incomingAddsHashMap[salnetHoursWorkedList[i].resourceID] =
        new Array<number>();
}

export default incomingAddsHashMap;
