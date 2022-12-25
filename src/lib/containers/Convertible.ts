export type Convertible<T extends object, K extends string> = T | Record<K, () => T>

export const convert = <T extends object, K extends string>(
    key: K,
    convertible: Convertible<T, K>,
): T => {
    if (key in convertible) return (convertible as Record<K, () => T>)[key]()

    return convertible as T
}
