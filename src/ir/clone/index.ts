import { iterateIR } from '../iterate/index.js'
import { mapIR } from '../map/index.js'
import { IR } from '../nodes/index.js'

export const cloneIR = (ir: IR): IR => mapIR(ir, ...iterateIR(ir).map(cloneIR))
