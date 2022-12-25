import { ArchetypeCallback } from '../../lib/enums/ArchetypeCallback.js'
import { BlockScope } from './BlockScope.js'
import { LexicalScope } from './LexicalScope.js'

export type Env = {
    readonly callback: ArchetypeCallback
    readonly lexical: LexicalScope
    readonly break?: BlockScope
    readonly continue?: BlockScope
    readonly return?: BlockScope
}
