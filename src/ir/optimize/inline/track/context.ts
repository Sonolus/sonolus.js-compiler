import { IR } from '../../../nodes/index.js'

export type TrackInlineIRContext = {
    sideEffects: Set<IR>
    dependencies: Map<object, Set<object>>
}
