import { Intrinsic, IntrinsicIterate } from '../../intrinsic/index.js'
import { createIterate } from '../utils/iterate.js'
import { Pointer } from '../utils/pointer.js'
import { ContainerConstructor } from './Container.js'
import { ContainerType } from './ContainerType.js'
import { Tuple } from './Tuple.js'

export type Dictionary<K, V> = {
    readonly capacity: number
    readonly count: number

    getKey(index: number): K
    getValue(index: number): V
    set(key: K, value: V): void
    has(key: K): boolean
    indexOf(key: K): number
    clear(): void
    copyTo(target: Dictionary<K, V>): void

    [Symbol.iterator](): Iterator<[key: K, value: V]>
}

export type DictionaryConstructor<K, V> = ContainerConstructor<Dictionary<K, V>> & {
    keyEquals(a: K, b: K): boolean
    valueEquals(a: V, b: V): boolean
}

export const Dictionary = <const K extends object, const V extends object>(
    capacity: number,
    keyType: K,
    valueType: V,
): DictionaryConstructor<ContainerType<K>, ContainerType<V>> => {
    const KeyBacking = Tuple(capacity, keyType)
    const ValueBacking = Tuple(capacity, valueType)

    type Ctor = typeof DictionaryImpl

    const DictionaryImpl = class {
        static readonly size = 1 + KeyBacking.size + ValueBacking.size

        static read([pointer, ...rest]: Pointer[]) {
            const dictionary = new DictionaryImpl()
            dictionary.count = pointer as never
            dictionary._keys = KeyBacking.read(rest)
            dictionary._values = ValueBacking.read(rest.slice(KeyBacking.size))

            return dictionary
        }

        static write(pointers: Pointer[], source: Dictionary<ContainerType<K>, ContainerType<V>>) {
            const target = this.read(pointers)
            target.clear()

            for (const [key, value] of source) {
                target.set(key, value)
            }
        }

        static equals(
            a: Dictionary<ContainerType<K>, ContainerType<V>>,
            b: Dictionary<ContainerType<K>, ContainerType<V>>,
        ) {
            if (a.count !== b.count) return false

            for (let i = 0; i < a.count; i++) {
                if (!this.keyEquals(a.getKey(i), b.getKey(i))) return false
                if (!this.valueEquals(a.getValue(i), b.getValue(i))) return false
            }

            return true
        }

        static copy(
            source: Dictionary<ContainerType<K>, ContainerType<V>>,
            target: Dictionary<ContainerType<K>, ContainerType<V>>,
        ) {
            target.clear()

            for (const [key, value] of source) {
                target.set(key, value)
            }
        }

        static readonly keyEquals = KeyBacking.valueEquals
        static readonly valueEquals = ValueBacking.valueEquals

        readonly capacity = capacity

        declare count: number

        private declare _keys: Tuple<ContainerType<K>>
        private declare _values: Tuple<ContainerType<V>>

        getKey(index: number) {
            return this._keys.get(index)
        }

        getValue(index: number) {
            return this._values.get(index)
        }

        private readonly _keyEquals = KeyBacking.valueEquals

        set(key: ContainerType<K>, value: ContainerType<V>) {
            for (let i = 0; i < this.count; i++) {
                if (this._keyEquals(this.getKey(i), key)) {
                    this._values.set(i, value)
                    return
                }
            }

            this._keys.set(this.count, key)
            this._values.set(this.count, value)
            this.count++
        }

        has(key: ContainerType<K>) {
            for (let i = 0; i < this.count; i++) {
                if (this._keyEquals(this.getKey(i), key)) return true
            }

            return false
        }

        indexOf(key: ContainerType<K>) {
            for (let i = 0; i < this.count; i++) {
                if (this._keyEquals(this.getKey(i), key)) return i
            }

            return -1
        }

        clear() {
            this.count = 0
        }

        private readonly _copy = (this.constructor as Ctor).copy

        copyFrom(source: Dictionary<ContainerType<K>, ContainerType<V>>) {
            this._copy(source, this)
        }

        copyTo(target: Dictionary<ContainerType<K>, ContainerType<V>>) {
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
                    const call = (method: 'getKey' | 'getValue') => {
                        const array: unknown[] = []
                        const children = [
                            ctx.ArrayConstructorAdd(ir, {
                                array,
                                value: index(),
                            }),
                        ]

                        return ctx.Call(ir, {
                            callee: ctx.value(ir, (thisValue as this)[method], thisValue),
                            args: ctx.ArrayConstructor(ir, {
                                array,
                                children,
                            }),
                        })
                    }

                    const array: unknown[] = []
                    const children = [
                        ctx.ArrayConstructorAdd(ir, {
                            array,
                            value: call('getKey'),
                        }),
                        ctx.ArrayConstructorAdd(ir, {
                            array,
                            value: call('getValue'),
                        }),
                    ]

                    return ctx.ArrayConstructor(ir, {
                        array,
                        children,
                    })
                },
                estreeCtx,
                ctx,
            )
    }

    Object.assign(DictionaryImpl.read, {
        [Intrinsic.Call]: (ir, _, [pointers], ctx) =>
            ctx.value(ir, DictionaryImpl.read(pointers as never)),
    } satisfies Intrinsic<'Call'>)

    return DictionaryImpl
}
