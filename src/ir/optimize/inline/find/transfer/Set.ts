import { myMapSet } from '../../../../../utils/MyMap.js'
import { Set } from '../../../../nodes/Set.js'
import { TransferFindInlineStateIR } from './index.js'

export const transferFindInlineSet: TransferFindInlineStateIR<Set> = (ir, input) => {
    const output = [...input]

    myMapSet(output, ir.target, ir)

    return output
}
