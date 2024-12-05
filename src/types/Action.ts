type Action =
| { type: "added"; id: number }
| { type: "deleted"; id: number };

export default Action;