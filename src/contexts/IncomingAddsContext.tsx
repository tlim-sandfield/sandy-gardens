import { createContext, useReducer, useContext } from "react";
import incomingAddsHashMap from "@/data/incomingAddsHashMap";
import me from "@/data/me";
import Action from "@/types/Action";
import IntegerHashMapState from "@/types/IntegerHashMapState";

export const IncomingAddsContext = createContext<IntegerHashMapState | null>(
    null
);
export const IncomingAddsDispatchContext =
    createContext<React.Dispatch<Action> | null>(null);

export default function IncomingAddsProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [incomingAdds, dispatch] = useReducer<
        React.Reducer<IntegerHashMapState, Action>
    >(incomingAddsReducer, { integerHashMap: incomingAddsHashMap });

    return (
        <IncomingAddsContext.Provider value={incomingAdds}>
            <IncomingAddsDispatchContext.Provider value={dispatch}>
                {children}
            </IncomingAddsDispatchContext.Provider>
        </IncomingAddsContext.Provider>
    );
}

export function useIncomingAdds() {
    return useContext(IncomingAddsContext)?.integerHashMap;
}

export function useIncomingAddsDispatch() {
    return useContext(IncomingAddsDispatchContext);
}

function incomingAddsReducer(
    state: IntegerHashMapState,
    action: Action
): IntegerHashMapState {
    const newIncomingAdds = state.integerHashMap;
    switch (action.type) {
        case "added": {
            newIncomingAdds[action.id].add(me);
            break;
        }
        default: {
            throw new Error("Unknown action");
        }
    }
    return { integerHashMap: newIncomingAdds };
}
