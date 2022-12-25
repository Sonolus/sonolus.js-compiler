import { Set } from '../../../../nodes/Set.js'
import { TransferEliminateIR } from './index.js'

export const transferEliminateSet: TransferEliminateIR<Set> = (ir, input) => {
    const output = new Set(input)

    output.delete(ir.target)

    return output
}
