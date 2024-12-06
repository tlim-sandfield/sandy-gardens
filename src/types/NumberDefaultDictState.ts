import DefaultDict from "./DefaultDict";

export default interface NumberDefaultDictState {
    numberDefaultDict: DefaultDict<number, Set<number>>;
}
