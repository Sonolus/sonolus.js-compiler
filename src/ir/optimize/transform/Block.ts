import { collectIR } from '../../collect/index.js'
import { Block } from '../../nodes/Block.js'
import { IR } from '../../nodes/index.js'
import { replaceIR } from '../../replace/index.js'
import { TransformIR } from './index.js'
import { transformIRAndGet } from './utils.js'

export const transformBlock: TransformIR<Block> = (ir, ctx) => {
    let body = transformIRAndGet(ir.body, ctx)

    while (true) {
        const count = countBreaks(body, ir.target)
        if (count === 0) return body

        const replacements = new Map<IR, IR>()
        findBreakReplacements(body, ir.target, replacements)

        const result = replaceIR(body, replacements)
        if (!result.changed) return { ...ir, body }

        body = transformIRAndGet(result.ir, ctx)
    }
}

const countBreaks = (ir: IR, target: object) =>
    collectIR(ir).filter((ir) => ir.type === 'Break' && ir.target === target).length

const findBreakReplacements = (ir: IR, target: object, replacements: Map<IR, IR>) => {
    switch (ir.type) {
        case 'Break': {
            if (ir.target !== target) break

            replacements.set(ir, ir.value)
            break
        }
        case 'Execute': {
            const last = ir.children[ir.children.length - 1]
            findBreakReplacements(last, target, replacements)
            break
        }
        default:
            break
    }
}
