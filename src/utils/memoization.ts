export const memoize = <T, U>(func: (arg: T) => U): ((arg: T) => U) => {
    const memoization = new Map<T, U>()

    return (arg) => {
        if (memoization.has(arg)) return memoization.get(arg)!

        const result = func(arg)
        memoization.set(arg, result)
        return result
    }
}
