import { Get } from '../../../../nodes/Get.js'
import { TransferEliminateIR } from './index.js'

export const transferEliminateGet: TransferEliminateIR<Get> = (ir, input) => {
    const output = new Set(input)

    output.add(ir.target)

    return output
}
