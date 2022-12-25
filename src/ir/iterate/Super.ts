import { Super } from '../nodes/Super.js'
import { IterateIR } from './index.js'

export const iterateSuper: IterateIR<Super> = (ir) => [ir.args.init]
