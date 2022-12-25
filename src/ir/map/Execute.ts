import { Execute } from '../nodes/Execute.js'
import { createMapIRVisitor } from './utils.js'

export const mapExecute = createMapIRVisitor<Execute>((_, ...children) => ({
    children,
}))
