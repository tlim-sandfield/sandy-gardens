type Action =
    | { type: "added"; id: number }
    | { type: "deleted"; id: number }
    | { type: "reordered"; newOrder: string[] };

export default Action;
