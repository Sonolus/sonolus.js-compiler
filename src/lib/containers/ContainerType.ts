import { ContainerConstructor } from './Container.js'

export const ContainerType = Symbol('Container.Type')

export type ContainerType<T> = T extends NumberConstructor
    ? number
    : T extends BooleanConstructor
    ? boolean
    : T extends Function
    ? T extends ContainerConstructor
        ? InstanceType<T> extends { [ContainerType]: infer T }
            ? T
            : InstanceType<T>
        : never
    : { -readonly [K in keyof T]: ContainerType<T[K]> }
