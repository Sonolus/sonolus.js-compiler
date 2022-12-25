import { Intrinsic, IntrinsicIterate } from '../../intrinsic/index.js'
import { createIterate } from '../utils/iterate.js'
import { Pointer } from '../utils/pointer.js'
import { ContainerConstructor } from './Container.js'
import { ContainerType } from './ContainerType.js'
import { Tuple } from './Tuple.js'

export type Collection<T> = {
    readonly capacity: number
    readonly count: number

    get(index: number): T
    add(value: T): void
    has(value: T): boolean
    indexOf(value: T): number
    clear(): void
    copyTo(target: Collection<T>): void

    [Symbol.iterator](): Iterator<T>
}

export type CollectionConstructor<T> = ContainerConstructor<Collection<T>> & {
    valueEquals(a: T, b: T): boolean
}

export const Collection = <const T extends object>(
    capacity: number,
    type: T,
): CollectionConstructor<ContainerType<T>> => {
    const ValueBacking = Tuple(capacity, type)

    type Ctor = typeof CollectionImpl

    const CollectionImpl = class {
        static readonly size = 1 + ValueBacking.size

        static read([pointer, ...rest]: Pointer[]) {
            const collection = new CollectionImpl()
            collection.count = pointer as never
            collection._values = ValueBacking.read(rest)

            return collection
        }

        static write(pointers: Pointer[], source: Collection<ContainerType<T>>) {
            const target = this.read(pointers)
            target.clear()

            for (const value of source) {
                target.add(value)
            }
        }

        static equals(a: Collection<ContainerType<T>>, b: Collection<ContainerType<T>>) {
            if (a.count !== b.count) return false

            for (let i = 0; i < a.count; i++) {
                if (!this.valueEquals(a.get(i), b.get(i))) return false
            }

            return true
        }

        static copy(source: Collection<ContainerType<T>>, target: Collection<ContainerType<T>>) {
            target.clear()

            for (const value of source) {
                target.add(value)
            }
        }

        static readonly valueEquals = ValueBacking.valueEquals

        readonly capacity = capacity

        declare count: number

        private declare _values: Tuple<ContainerType<T>>

        get(index: number) {
            return this._values.get(index)
        }

        add(value: ContainerType<T>) {
            for (let i = 0; i < this.count; i++) {
                if (this._valueEquals(this.get(i), value)) return
            }

            this._values.set(this.count, value)
            this.count++
        }

        private readonly _valueEquals = ValueBacking.valueEquals

        has(value: ContainerType<T>) {
            for (let i = 0; i < this.count; i++) {
                if (this._valueEquals(this.get(i), value)) return true
            }

            return false
        }

        indexOf(value: ContainerType<T>) {
            for (let i = 0; i < this.count; i++) {
                if (this._valueEquals(this.get(i), value)) return i
            }

            return -1
        }

        clear() {
            this.count = 0
        }

        private readonly _copy = (this.constructor as Ctor).copy

        copyFrom(source: Collection<ContainerType<T>>) {
            this._copy(source, this)
        }

        copyTo(target: Collection<ContainerType<T>>) {
            this._copy(this, target)
        }

        declare [Symbol.iterator]: never
        private readonly [Intrinsic.Iterate]: IntrinsicIterate = (ir, thisValue, estreeCtx, ctx) =>
            createIterate(
                ir,
                (index) =>
                    ctx.Binary(ir.value, {
                        operator: '<',
                        lhs: index(),
                        rhs: ctx.value(ir.value, (thisValue as this).count),
                    }),
                (index) => {
                    const array: unknown[] = []

                    return ctx.Call(ir, {
                        callee: ctx.value(ir, (thisValue as this).get, thisValue),
                        args: {
                            init: ctx.ArrayAdd(ir, {
                                array,
                                value: index(),
                            }),
                            value: array,
                        },
                    })
                },
                estreeCtx,
                ctx,
            )
    }

    Object.assign(CollectionImpl.read, {
        [Intrinsic.Call]: (ir, _, [pointers], ctx) =>
            ctx.value(ir, CollectionImpl.read(pointers as never)),
    } satisfies Intrinsic<'Call'>)

    return CollectionImpl
}
