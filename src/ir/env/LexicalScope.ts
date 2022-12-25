import { IR } from '../nodes/index.js'
import { TransformIRContext } from '../optimize/transform/context.js'

export type LexicalScope = {
    get(name: string): unknown
    set(ir: IR, name: string, value: unknown, ctx: TransformIRContext): void
}
