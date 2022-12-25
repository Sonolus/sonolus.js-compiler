import { Get } from '../nodes/Get.js'
import { createMapIRVisitor } from './utils.js'

export const mapGet = createMapIRVisitor<Get>((ir) => ({
    target: ir.target,
}))
