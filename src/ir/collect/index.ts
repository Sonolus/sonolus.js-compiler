import { iterateIR } from '../iterate/index.js'
import { IR } from '../nodes/index.js'

export const collectIR = (ir: IR, irs: IR[] = []): IR[] => {
    for (const child of iterateIR(ir)) {
        collectIR(child, irs)
    }

    irs.push(ir)

    return irs
}
