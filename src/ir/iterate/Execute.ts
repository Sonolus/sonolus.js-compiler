import { Execute } from '../nodes/Execute.js'
import { IterateIR } from './index.js'

export const iterateExecute: IterateIR<Execute> = (ir) => ir.children.slice()
