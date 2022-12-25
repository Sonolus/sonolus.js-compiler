import { RuntimeFunction } from 'sonolus-core'
import { SNode } from './index.js'

export type Func<T extends RuntimeFunction = RuntimeFunction> = {
    func: T
    args: SNode[]
}
