import { IR } from '../nodes/index.js'
import { eliminateIR } from './eliminate/index.js'
import { inlineIR } from './inline/index.js'
import { propagateIR } from './propagate/index.js'
import { createTransformIRContext } from './transform/context.js'
import { transformIR } from './transform/index.js'

const step = (prev: (ir: IR) => IR, next: (ir: IR) => { ir: IR; changed: boolean }) => (ir: IR) => {
    while (true) {
        ir = prev(ir)

        const result = next(ir)
        ir = result.ir

        if (!result.changed) return ir
    }
}

const transform = (ir: IR) => transformIR(ir, createTransformIRContext())

const propagate = step(transform, propagateIR)

const eliminate = step(propagate, eliminateIR)

const inline = step(eliminate, inlineIR)

export const optimizeIR = (ir: IR, level: 'low' | 'high'): IR => {
    if (level === 'low') return propagate(ir)

    return inline(ir)
}
