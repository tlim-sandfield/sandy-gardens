import { createContext, useReducer, useContext } from "react";
import neighboursHashMap from "@/data/neighboursHashMap";
import me from "@/data/me";
import Action from "@/types/Action";
import IntegerHashMapState from "@/types/IntegerHashMapState";

export const NeighboursContext = createContext<IntegerHashMapState | null>(
    null
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
    action: Action
): IntegerHashMapState {
    const newNeighbours = { ...state.integerHashMap };
    switch (action.type) {
        case "added": {
            newNeighbours[me.resourceID].add(action.id);
            break;
        }
        case "deleted": {
            newNeighbours[me.resourceID].delete(action.id);
            break;
        }
        // case "reordered": {
        //     newNeighbours[me.resourceID]
        //     break;
        // }
        default: {
            throw new Error("Unknown action");
        }
    }
    return { integerHashMap: newNeighbours };
}
