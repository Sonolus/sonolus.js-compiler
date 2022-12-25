import { Block } from '../nodes/Block.js'
import { IterateIR } from './index.js'

export const iterateBlock: IterateIR<Block> = (ir) => [ir.body]
