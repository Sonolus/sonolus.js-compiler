import { Intrinsic } from '../../../../intrinsic/index.js'
import { IR } from '../../../../ir/nodes/index.js'
import { TransformIRContext } from '../../../../ir/optimize/transform/context.js'
import { ContainerConstructor } from '../Container.js'
import { getContainerConstructor } from './constructor.js'

export const createCompoundContainer = (
    type: object,
): {
    size: number
    read(ir: IR, pointers: unknown[], ctx: TransformIRContext): IR
    write(ir: IR, pointers: unknown[], value: unknown, ctx: TransformIRContext): IR
    equals(a: unknown, b: unknown): boolean
} => ({
    size: getCompoundContainerSize(type),
    read: createCompoundContainerRead(type),
    write: createCompoundContainerWrite(type),
    equals: createCompoundContainerEquals(type) as never,
})

const getCompoundContainerSize = (type: object): number => {
    if (typeof type === 'function') return getContainerConstructor(type).size

    const members = (Array.isArray(type) ? type : Object.values(type)) as object[]
    return members.reduce((sum, member) => sum + getCompoundContainerSize(member), 0)
}

const createCompoundContainerRead =
    (type: object) => (ir: IR, pointers: unknown[], ctx: TransformIRContext) => {
        const walk = (type: object): IR => {
            if (typeof type === 'function') {
                const Container = getContainerConstructor(type)

                return ctx.Call(ir, {
                    callee: ctx.value(ir, Container.read, Container),
                    args: ctx.value(ir, [pointers.splice(0, Container.size)]),
                })
            }

            if (Array.isArray(type)) {
                const array: unknown[] = []
                const children = type.map((element) =>
                    ctx.ArrayConstructorAdd(ir, {
                        array,
                        value: walk(element as object),
                    }),
                )

                return ctx.ArrayConstructor(ir, {
                    array,
                    children,
                })
            }

            const object = {}
            const children = Object.entries(type).map(([k, v]) =>
                ctx.ObjectConstructorAdd(ir, {
                    object,
                    kind: 'init',
                    key: ctx.value(ir, k),
                    value: walk(v as object),
                }),
            )

            return ctx.ObjectConstructor(ir, {
                object,
                children,
            })
        }

        return walk(type)
    }

const createCompoundContainerWrite =
    (type: object) => (ir: IR, pointers: unknown[], value: unknown, ctx: TransformIRContext) => {
        const writes: IR[] = []

        const walk = (type: object, value: unknown) => {
            if (typeof type === 'function') {
                const Container = getContainerConstructor(type)

                writes.push(
                    ctx.Call(ir, {
                        callee: ctx.value(ir, Container.write, Container),
                        args: ctx.value(ir, [pointers.splice(0, Container.size), value]),
                    }),
                )
                return
            }

            const entries = Array.isArray(type) ? type.entries() : Object.entries(type)
            for (const [k, v] of entries) {
                walk(v as object, (value as never)[k])
            }
        }

        walk(type, value)

        return ctx.Execute(ir, {
            children: [...writes, ctx.zero(ir)],
        })
    }

const createCompoundContainerEquals = (type: object) => {
    const comparisons: [(ir: IR, ctx: TransformIRContext) => IR, ContainerConstructor][] = []

    const findComparisons = (get: (ir: IR, ctx: TransformIRContext) => IR, type: object): void => {
        if (typeof type === 'function') {
            comparisons.push([get, getContainerConstructor(type)])
            return
        }

        const entries = Array.isArray(type) ? type.entries() : Object.entries(type)
        for (const [k, v] of entries) {
            findComparisons(
                (ir, ctx) =>
                    ctx.Member(ir, {
                        object: ir,
                        key: ctx.value(ir, k),
                    }),
                v as object,
            )
        }
    }

    findComparisons((ir) => ir, type)

    const comparator = createComparator(comparisons)

    return {
        [Intrinsic.Call]: (ir, _, [a, b], ctx) =>
            comparator(
                ir,
                () => ctx.value(ir, a),
                () => ctx.value(ir, b),
                ctx,
            ),
    } satisfies Intrinsic<'Call'>
}

type Comparator = (ir: IR, a: () => IR, b: () => IR, ctx: TransformIRContext) => IR

const createComparator = (
    comparisons: [(ir: IR, ctx: TransformIRContext) => IR, ContainerConstructor][],
): Comparator => {
    const comparators: Comparator[] = comparisons.map(([get, Container]) => (ir, a, b, ctx) => {
        const array: unknown[] = []
        const children = [
            ctx.ArrayConstructorAdd(ir, {
                array,
                value: get(a(), ctx),
            }),
            ctx.ArrayConstructorAdd(ir, {
                array,
                value: get(b(), ctx),
            }),
        ]

        return ctx.Call(ir, {
            callee: ctx.value(ir, Container.equals, Container),
            args: ctx.ArrayConstructor(ir, {
                array,
                children,
            }),
        })
    })

    while (true) {
        const lhs = comparators.shift()
        if (!lhs) return (ir, _a, _b, ctx) => ctx.value(ir, true)

        const rhs = comparators.shift()
        if (!rhs) return lhs

        comparators.unshift((ir, a, b, ctx) =>
            ctx.Logical(ir, {
                operator: '&&',
                lhs: lhs(ir, a, b, ctx),
                rhs: rhs(ir, a, b, ctx),
            }),
        )
    }
}
