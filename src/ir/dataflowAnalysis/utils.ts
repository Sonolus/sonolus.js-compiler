export const meetAll = <T>(initial: T, states: T[], meet: (a: T, b: T) => T): T => {
    while (true) {
        const a = states.pop()
        if (!a) return initial

        const b = states.pop()
        if (!b) return a

        states.push(meet(a, b))
    }
}
