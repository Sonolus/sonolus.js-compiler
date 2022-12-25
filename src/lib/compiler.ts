import { InspectOptions } from 'node:util'
import { Intrinsic } from '../intrinsic/index.js'
import { defineLib } from './define/lib.js'
import { ArchetypeCallback } from './index.js'

type CompilerEnv = {
    readonly callback: ArchetypeCallback
}

type Compiler = {
    readonly isCompiling: boolean
    readonly env: CompilerEnv

    log(message?: unknown, ...optionalParams: unknown[]): void
    dir(obj: unknown, options?: InspectOptions): void
}

export const compiler = defineLib<Compiler>({
    get isCompiling() {
        return typeof this.env.callback === 'string'
    },
    env: {
        callback: {
            [Intrinsic.Get]: (ir, ctx) => ctx.value(ir, ir.env.callback),
        },
    },

    log: {
        [Intrinsic.Call]: (ir, _, args, ctx) =>
            ctx.JSCall(ir, {
                func: console.log,
                thisValue: console,
                args: args.map((arg) => ctx.value(ir, arg)),
            }),
    },
    dir: {
        [Intrinsic.Call]: (ir, _, args, ctx) =>
            ctx.JSCall(ir, {
                func: console.dir,
                thisValue: console,
                args: args.map((arg) => ctx.value(ir, arg)),
            }),
    },
})
