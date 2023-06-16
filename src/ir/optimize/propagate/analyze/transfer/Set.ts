import { myMapSet } from '../../../../../utils/MyMap.js'
import { Set } from '../../../../nodes/Set.js'
import { TransferPropagateIR } from './index.js'

export const transferPropagateSet: TransferPropagateIR<Set> = (ir, input) => {
    const output = [...input]

    const element = ir.value.type === 'Value' ? ir.value : 'T'
    myMapSet(output, ir.target, element)

    return output
}
