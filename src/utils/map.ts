export const merge = <K, V>(
    a: ReadonlyMap<K, V>,
    b: ReadonlyMap<K, V>,
    merge: (valueA: V | undefined, valueB: V | undefined) => V | undefined,
): Map<K, V> =>
    new Map(
        [...new Set([...a.keys(), ...b.keys()])]
            .map((key) => [key, merge(a.get(key), b.get(key))] as const)
            .filter((kvp): kvp is [K, V] => kvp[1] !== undefined),
    )

export const compare = <K, V>(
    a: ReadonlyMap<K, V>,
    b: ReadonlyMap<K, V>,
    compare: (valueA: V, valueB: V) => unknown,
): boolean => {
    if (a === b) return true
    if (a.size !== b.size) return false

    for (const [target, valueA] of a.entries()) {
        const valueB = b.get(target)
        if (valueB === undefined) return false

        if (!compare(valueA, valueB)) return false
    }

    return true
}
