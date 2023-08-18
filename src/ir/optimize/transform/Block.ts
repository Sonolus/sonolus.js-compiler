import { collectIR } from '../../collect/index.js'
import { Block } from '../../nodes/Block.js'
import { IR } from '../../nodes/index.js'
import { TransformIR } from './index.js'
import { rewriteAsExecute, transformIRAndGet } from './utils.js'

export const transformBlock: TransformIR<Block> = (ir, ctx) => {
    const body = transformIRAndGet(ir.body, ctx)

    const count = countBreaks(body, ir.target)

    if (count === 0) return body

    const result = endsInBreak(body, ir.target)
    if (!result) return { ...ir, body }

    if (count === 1) return rewriteAsExecute(ir, ctx, result)

    return { ...ir, body: rewriteAsExecute(ir, ctx, result) }
}

const countBreaks = (ir: IR, target: object) =>
    collectIR(ir).filter((ir) => ir.type === 'Break' && ir.target === target).length

const endsInBreak = (ir: IR, target: object): IR[] | undefined => {
    switch (ir.type) {
        case 'Execute': {
            const last = ir.children.at(-1)
            if (!last) return

            const result = endsInBreak(last, target)
            if (!result) return

            return [...ir.children.slice(0, -1), ...result]
        }
        case 'Break':
            if (ir.target !== target) return

            return [ir.value]
        default:
            return
    }
}
