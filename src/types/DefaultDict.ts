export default class DefaultDict<K, V> extends Map<K, V> {
    constructor(private defaultValue: () => V) {
        super();
    }

    get(key: K): V {
        if (!this.has(key)) {
            this.set(key, this.defaultValue());
        }
        return super.get(key)!;
    }

    delete(key: K): boolean {
        return this.delete(key);
    }

    clear(): void {
        this.clear();
    }

    values(): IterableIterator<V> {
        return this.values();
    }

    keys(): IterableIterator<K> {
        return this.keys();
    }

    entries(): IterableIterator<[K, V]> {
        return this.entries();
    }

    forEach(
        callbackfn: (value: V, key: K, map: Map<K, V>) => void,
        thisArg?: ThisParameterType<typeof callbackfn>
    ): void {
        this.forEach(callbackfn, thisArg);
    }
}