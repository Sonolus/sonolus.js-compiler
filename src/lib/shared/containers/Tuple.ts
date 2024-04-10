import { Intrinsic, IntrinsicIterate } from '../../../intrinsic/index.js'
import { IR } from '../../../ir/nodes/index.js'
import { TransformIRContext } from '../../../ir/optimize/transform/context.js'
import { createIterate } from '../utils/iterate.js'
import { Pointer } from '../utils/pointer.js'
import { ContainerConstructor } from './Container.js'
import { ContainerType } from './ContainerType.js'
import { createCompoundContainer } from './utils/compound.js'
import { createPointers } from './utils/pointers.js'

export type Tuple<T> = {
    readonly length: number

    get(index: number): T
    set(index: number, value: T): void
    has(value: T): boolean
    indexOf(value: T): number
    copyTo(target: Tuple<T>): void

    [Symbol.iterator](): Iterator<T>
}

export type TupleConstructor<T> = ContainerConstructor<Tuple<T>> & {
    valueEquals(a: T, b: T): boolean
}

export const Tuple = <const T extends object>(
    length: number,
    type: T,
): TupleConstructor<ContainerType<T>> => {
    const { size, read, write, equals } = createCompoundContainer(type)

    type Ctor = typeof TupleImpl
    type TupleImpl = InstanceType<typeof TupleImpl>

    const pointers = (ir: IR, tuple: TupleImpl, index: () => IR, ctx: TransformIRContext) =>
        createPointers(ir, tuple['_buffer'] as never, index, 0, size, ctx)

    const TupleImpl = class {
        static readonly size = length * size

        static read([pointer]: Pointer[]) {
            const tuple = new TupleImpl()
            tuple._buffer = pointer as never

            return tuple
        }

        static write(pointers: Pointer[], value: Tuple<ContainerType<T>>) {
            const tuple = this.read(pointers)

            for (let i = 0; i < tuple.length; i++) {
                tuple.set(i, value.get(i))
            }
        }

        static equals(a: Tuple<ContainerType<T>>, b: Tuple<ContainerType<T>>) {
            if (a.length !== b.length) return false

            for (let i = 0; i < a.length; i++) {
                if (!this.valueEquals(a.get(i), b.get(i))) return false
            }

            return true
        }

        static copy(source: Tuple<ContainerType<T>>, target: Tuple<ContainerType<T>>) {
            // eslint-disable-next-line @typescript-eslint/only-throw-error
            if (source.length !== target.length) throw 'Tuples must have the same length'

            for (let i = 0; i < target.length; i++) {
                target.set(i, source.get(i))
            }
        }

        static readonly valueEquals = equals

        readonly length = length

        private declare _buffer: number

        readonly get: (index: number) => ContainerType<T> = {
            [Intrinsic.Call]: (ir, thisValue, [index], ctx) =>
                read(
                    ir,
                    pointers(ir, thisValue as never, () => ctx.value(ir, index), ctx),
                    ctx,
                ),
        } satisfies Intrinsic<'Call'> as never

        readonly set: (index: number, value: ContainerType<T>) => void = {
            [Intrinsic.Call]: (ir, thisValue, [index, value], ctx) =>
                write(
                    ir,
                    pointers(ir, thisValue as never, () => ctx.value(ir, index), ctx),
                    value,
                    ctx,
                ),
        } satisfies Intrinsic<'Call'> as never

        private readonly _valueEquals = equals

        has(value: ContainerType<T>) {
            for (let i = 0; i < this.length; i++) {
                if (this._valueEquals(this.get(i), value)) return true
            }

            return false
        }

        indexOf(value: ContainerType<T>) {
            for (let i = 0; i < this.length; i++) {
                if (this._valueEquals(this.get(i), value)) return i
            }

            return -1
        }

        private readonly _copy = (this.constructor as Ctor).copy

        copyFrom(source: Tuple<ContainerType<T>>) {
            this._copy(source, this)
        }

        copyTo(target: Tuple<ContainerType<T>>) {
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
                        rhs: ctx.value(ir.value, (thisValue as this)._buffer),
                    }),
                (index) => read(ir, pointers(ir, thisValue as never, index, ctx), ctx),
                estreeCtx,
                ctx,
            )
    }

    Object.assign(TupleImpl.read, {
        [Intrinsic.Call]: (ir, _, [pointers], ctx) =>
            ctx.value(ir, TupleImpl.read(pointers as never)),
    } satisfies Intrinsic<'Call'>)

    return TupleImpl
}
