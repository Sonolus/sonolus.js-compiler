import { InspectOptions } from 'node:util'
import { Intrinsic } from '../../intrinsic/index.js'
import { defineLib } from './define/lib.js'

type CompilerEnv<T extends string> = {
    readonly callback: T
}

type Compiler<T extends string> = {
    readonly isCompiling: boolean
    readonly env: CompilerEnv<T>

    log(message?: unknown, ...optionalParams: unknown[]): void
    dir(obj: unknown, options?: InspectOptions): void
}

export const createCompiler = <T extends string>(): Compiler<T> =>
    defineLib<Compiler<string>>({
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
    }) as never
