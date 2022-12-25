import { Native } from '../nodes/Native.js'
import { IterateIR } from './index.js'

export const iterateNative: IterateIR<Native> = (ir) => ir.args.slice()
