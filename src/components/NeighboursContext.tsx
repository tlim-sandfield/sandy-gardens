"use client";

import { createContext, useContext, useState } from "react";
import IntegerHashMap from "@/types/IntegerHashMap";
import salnetHoursWorkedList from "@/data/salnetHoursWorkedList";

const NeighboursContext = createContext<{
    neighboursHashMap: IntegerHashMap;
    setNeighboursHashMap: (newHashMap: IntegerHashMap) => void;
}>({
    neighboursHashMap: {},
    setNeighboursHashMap: () => {},
});

export const NeighboursContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [neighboursHashMap, setNeighboursHashMap] = useState<IntegerHashMap>(
        {}
    );

    salnetHoursWorkedList.forEach((person) => {
        neighboursHashMap[person.resourceID] = new Set();
    });

    return (
        <NeighboursContext.Provider
            value={{ neighboursHashMap, setNeighboursHashMap }}
        >
            {children}
        </NeighboursContext.Provider>
    );
};

export const useNeighboursContext = () => useContext(NeighboursContext);
