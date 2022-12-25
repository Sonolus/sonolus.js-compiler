import { RuntimeFunction } from 'sonolus-core'
import { Func } from '../../snode/nodes/Func.js'
import { CompilerError } from '../../utils/CompilerError.js'
import { IR } from '../nodes/index.js'
import { compileIR } from './index.js'

export type CompileIRContext = {
    blockStack: object[]
    error(ir: IR, message: string): CompilerError
    func(func: RuntimeFunction, ...args: IR[]): Func
    get(target: object): number
}

export const createCompileIRContext = (): CompileIRContext => {
    const allocations = new Map<object, number>()
    let current = 0

    return {
        blockStack: [],

        error: (ir, message) => new CompilerError(ir.stackTraces, message),

        func(func, ...args) {
            return {
                func,
                args: args.map((arg) => compileIR(arg, this)),
            }
        },

        get(target) {
            const result = allocations.get(target)
            if (result !== undefined) return result

            const index = current++
            allocations.set(target, index)
            return index
        },
    }
}
