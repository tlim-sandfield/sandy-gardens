import { createContext, useReducer, useContext } from "react";
import neighboursHashMap from "@/data/neighboursHashMap";
import me from "@/data/me";
import Action from "@/types/Action";
import IntegerHashMapState from "@/types/IntegerHashMapState";
import nameToID from "@/utils/nameToID";

export const NeighboursContext = createContext<IntegerHashMapState | null>(
    null,
);
export const NeighboursDispatchContext =
    createContext<React.Dispatch<Action> | null>(null);

export default function NeighboursProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [neighbours, dispatch] = useReducer<
        React.Reducer<IntegerHashMapState, Action>
    >(neighboursReducer, { integerHashMap: neighboursHashMap });

    return (
        <NeighboursContext.Provider value={neighbours}>
            <NeighboursDispatchContext.Provider value={dispatch}>
                {children}
            </NeighboursDispatchContext.Provider>
        </NeighboursContext.Provider>
    );
}

export function useNeighbours() {
    return useContext(NeighboursContext)?.integerHashMap;
}

export function useNeighboursDispatch() {
    return useContext(NeighboursDispatchContext);
}

function neighboursReducer(
    state: IntegerHashMapState,
    action: Action,
): IntegerHashMapState {
    const newNeighbours = { ...state.integerHashMap };
    switch (action.type) {
        case "added": {
            if (!newNeighbours[me.resourceID].includes(action.id)) {
                newNeighbours[me.resourceID].push(action.id);
            }
            break;
        }
        case "deleted": {
            const index = newNeighbours[me.resourceID].indexOf(action.id);
            if (index > -1) {
                newNeighbours[me.resourceID].splice(index, 1);
            }
            break;
        }
        case "reordered": {
            const reorderedItems = [];
            for (let i = 0; i < action.newOrder.length; i++) {
                reorderedItems.push(nameToID(action.newOrder[i]));
            }
            newNeighbours[me.resourceID] = [...reorderedItems];
            break;
        }
    }
    return { integerHashMap: newNeighbours };
}
