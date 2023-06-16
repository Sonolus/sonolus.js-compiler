import { ContainerType } from './ContainerType.js'

export class DataType<T extends number | boolean> {
    declare [ContainerType]: T

    static readonly size = 1

    static read<T extends number | boolean>([value]: DataType<T>[]): DataType<T> {
        return value
    }

    static write<T extends number | boolean>(pointers: DataType<T>[], value: DataType<T>): void {
        pointers[0] = value
    }

    static equals<T extends number | boolean>(a: DataType<T>, b: DataType<T>): boolean {
        return a === b
    }

    constructor(value: DataType<T>) {
        return value
    }
}
