import { IR, IRChildren } from '../nodes/index.js'
import { MapIR } from './index.js'

export const createMapIRVisitor =
    <N extends IR>(
        map: (ir: N, ...children: IRChildren<N>) => Omit<N, 'stackTraces' | 'env' | 'type'>,
    ): MapIR<N> =>
    (ir, ...children) =>
        ({
            stackTraces: ir.stackTraces,
            env: ir.env,

            type: ir.type,
            ...map(ir, ...(children as IRChildren<N>)),
        }) as N
