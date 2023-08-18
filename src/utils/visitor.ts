type Node = {
    type: string
}

type GetNode<F extends (...args: never[]) => unknown> = F extends (
    node: infer N extends Node,
    ...args: never[]
) => unknown
    ? N
    : never

type GetArgs<F extends (...args: never[]) => unknown> = F extends (
    node: never,
    ...args: infer A
) => unknown
    ? A
    : never

type GetVisitor<P extends string, F extends (...args: never[]) => unknown> = {
    [K in GetNode<F> as `${P}${K['type']}`]: (node: K, ...args: GetArgs<F>) => ReturnType<F>
}

type CreateVisit<F extends (...args: never[]) => unknown> = {
    create<P extends string>(prefix: P, visitor: GetVisitor<P, F>): F
    create<P extends string>(prefix: P, visitor: Partial<GetVisitor<P, F>>, onDefault: F): F
}

export const visit = <F extends (...args: never[]) => unknown>(): CreateVisit<F> =>
    ({
        create: (prefix, visitor, onDefault) => {
            const map = new Map(
                Object.entries(visitor).map(([key, visit]) => [key.slice(prefix.length), visit]),
            )

            return (node, ...args) => {
                const visit = map.get((node as Node).type)
                if (!visit) return onDefault(node, ...args)

                return (visit as F)(node, ...args)
            }
        },
    }) as CreateVisit<F>
