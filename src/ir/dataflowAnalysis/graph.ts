import { IR } from '../nodes/index.js'

export type Graph = {
    readonly ins: ReadonlyMap<IR, ReadonlySet<IR>>
    readonly outs: ReadonlyMap<IR, ReadonlySet<IR>>
}
