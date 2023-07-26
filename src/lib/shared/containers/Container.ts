// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any) => T

type ContainerConstructorMethods<T> = {
    readonly size: number
    read(pointers: unknown[]): T
    write(pointers: unknown[], source: T): void
    equals(a: T, b: T): boolean
}

type ContainerMethods<T> = {
    copyFrom(source: T): void
    copyTo(target: T): void
}

export type ContainerConstructor<T = unknown> = Constructor<T> & ContainerConstructorMethods<T>

export const Container = <T>(
    ...keys: string[]
): Constructor<ContainerMethods<T>> & ContainerConstructorMethods<T> => {
    const Impl = class {
        static _keys = keys

        static get size(): number {
            return this._keys.length
        }

        static read(pointers: []): T {
            return new this(...pointers) as never
        }

        static write(pointers: never[], source: T): void {
            for (const [i, key] of this._keys.entries()) {
                pointers[i] = (source as never)[key]
            }
        }

        static equals(a: T, b: T): boolean {
            let result = true
            for (const key of this._keys) {
                result = result && (a as never)[key] === (b as never)[key]
            }

            return result
        }

        static copy(source: T, target: T): void {
            for (const key of this._keys) {
                ;(target as never)[key] = (source as never)[key]
            }
        }

        declare _keys: string[]

        copyFrom(source: T) {
            for (const key of this._keys) {
                ;(this as never)[key] = (source as never)[key]
            }
        }

        copyTo(target: T) {
            for (const key of this._keys) {
                ;(target as never)[key] = (this as never)[key]
            }
        }
    }

    Impl.prototype._keys = keys

    return Impl
}
