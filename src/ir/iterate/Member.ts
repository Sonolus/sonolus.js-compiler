import { Member } from '../nodes/Member.js'
import { IterateIR } from './index.js'

export const iterateMember: IterateIR<Member> = (ir) => [ir.object, ir.key]
