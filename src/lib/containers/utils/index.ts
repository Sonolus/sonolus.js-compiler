import { ContainerConstructor } from '../Container.js'
import { DataType } from '../DataType.js'

export const getContainerConstructor = (type: Function): ContainerConstructor => {
    if (type === Number || type === Boolean) return DataType

    return type as ContainerConstructor
}
