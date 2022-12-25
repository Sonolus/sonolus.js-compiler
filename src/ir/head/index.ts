import { iterateIR } from '../iterate/index.js'
import { IR } from '../nodes/index.js'

export const head = (ir: IR): IR => {
    do {
        const children = iterateIR(ir)
        if (!children.length) return ir

        ir = children[0]
    } while (true)
}
