import { Set } from '../../../../nodes/Set.js'
import { TransferPropagateIR } from './index.js'

export const transferPropagateSet: TransferPropagateIR<Set> = (ir, input) => {
    const output = new Map(input)

    const element = ir.value.type === 'Value' ? ir.value : 'T'
    output.set(ir.target, element)

    return output
}
