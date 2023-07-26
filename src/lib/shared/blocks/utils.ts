import { Intrinsic } from '../../../intrinsic/index.js'
import { IR } from '../../../ir/nodes/index.js'
import { ContainerType } from '../containers/ContainerType.js'
import { getContainerConstructor } from '../containers/utils/constructor.js'

export const createDefineBlock = (
    name: string,
    id: number,
    capacity: number,
    pointer: (
        id: number | (() => IR),
        x: number | (() => IR),
        y: number | (() => IR),
        s: number | (() => IR),
    ) => Intrinsic<'Get' | 'Set'>,
): (<const T extends object>(type: T) => ContainerType<T>) => {
    let offset = 0
    const allocate = (size: number) => {
        const start = offset
        offset += size

        if (offset > capacity) throw new Error(`Max ${name} capacity (${capacity}) reached`)

        return [...Array(size).keys()].map((i) => pointer(id, start + i, 0, 0))
    }

    return ((type: object) => readContainer(type, allocate)) as never
}

export const readContainer = (
    type: object,
    allocate: (size: number) => Intrinsic<'Get' | 'Set'>[],
): unknown => {
    if (typeof type === 'function') {
        const Container = getContainerConstructor(type)

        return Container.read(allocate(Container.size))
    }

    return Array.isArray(type)
        ? type.map((v) => readContainer(v as never, allocate))
        : Object.fromEntries(
              Object.entries(type).map(([k, v]) => [k, readContainer(v as never, allocate)]),
          )
}
