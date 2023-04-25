export type MyMap<K, V> = {
    k: K
    v: V
}[]

export type ReadonlyMyMap<K, V> = ReadonlyArray<{
    readonly k: K
    readonly v: V
}>

export const myMapHas = <K, V>(myMap: ReadonlyMyMap<K, V>, key: K): boolean =>
    myMap.some(({ k }) => k === key)

export const myMapGet = <K, V>(myMap: ReadonlyMyMap<K, V>, key: K): V | undefined =>
    myMap.find(({ k }) => k === key)?.v

export const myMapSet = <K, V>(myMap: MyMap<K, V>, key: K, value: V): void => {
    const index = myMap.findIndex(({ k }) => k === key)
    if (index === -1) {
        myMap.push({ k: key, v: value })
    } else {
        myMap[index] = { k: key, v: value }
    }
}

export const myMapDelete = <K, V>(myMap: MyMap<K, V>, key: K): void => {
    const index = myMap.findIndex(({ k }) => k === key)
    if (index === -1) return

    myMap.splice(index, 1)
}

export const myMapCompare = <K, V>(
    a: ReadonlyMyMap<K, V>,
    b: ReadonlyMyMap<K, V>,
    compare: (valueA: V, valueB: V) => unknown,
): boolean => {
    if (a === b) return true
    if (a.length !== b.length) return false

    for (const { k: target, v: valueA } of a) {
        const valueB = myMapGet(b, target)
        if (valueB === undefined) return false

        if (!compare(valueA, valueB)) return false
    }

    return true
}

export const myMapMerge = <K, V>(
    a: ReadonlyMyMap<K, V>,
    b: ReadonlyMyMap<K, V>,
    merge: (valueA: V | undefined, valueB: V | undefined) => V | undefined,
): MyMap<K, V> => {
    const keys: K[] = []

    for (const { k } of a) {
        keys.push(k)
    }
    for (const { k } of b) {
        keys.push(k)
    }

    return [...new Set(keys)]
        .map((key) => ({ k: key, v: merge(myMapGet(a, key), myMapGet(b, key)) }))
        .filter((kvp): kvp is { k: K; v: V } => kvp.v !== undefined)
}
