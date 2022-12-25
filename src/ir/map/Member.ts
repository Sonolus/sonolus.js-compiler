import { Member } from '../nodes/Member.js'
import { createMapIRVisitor } from './utils.js'

export const mapMember = createMapIRVisitor<Member>((_, object, key) => ({
    object,
    key,
}))
