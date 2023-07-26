import { Node } from 'estree'
import { Env } from '../../ir/env/index.js'
import { Block } from '../../ir/nodes/Block.js'
import { Break } from '../../ir/nodes/Break.js'
import { Value } from '../../ir/nodes/Value.js'
import { IR, IRTypes } from '../../ir/nodes/index.js'
import { CompilerError, StackTrace } from '../../utils/CompilerError.js'

type IRFunctions = {
    [N in IR as N['type']]: (node: Node, props: Omit<N, 'stackTraces' | 'env' | 'type'>) => N
}

export type CompileESTreeContext = IRFunctions & {
    error(node: Node, message: string): CompilerError
    zero(node: Node): Value
    value(node: Node, value: unknown, thisValue?: unknown, isSuper?: boolean): Value

    readonly thisValue: unknown
    readonly prototype: unknown

    lexical<T>(get: () => T): T
    break(node: Node, get: () => IR): Block
    continue(node: Node, get: () => IR): Block
    return(node: Node, get: () => IR): Block
    goto(type: 'break' | 'continue' | 'return', node: Node, value: IR): Break
}

export const createCompileESTreeContext = (
    stackTraces: StackTrace[],
    thisValue: unknown,
    prototype: unknown,
    env: Env,
): CompileESTreeContext => {
    const getStackTraces = (node: Node) => [
        ...stackTraces,
        {
            source: node.sourceFile,
            start: node.start,
            end: node.end,
        },
    ]

    const irFunctions = Object.fromEntries(
        IRTypes.map((type) => [
            type,
            (node: Node, props: object) => ({
                stackTraces: getStackTraces(node),
                env,

                type,
                ...props,
            }),
        ]),
    ) as IRFunctions

    const createBlock = (type: 'break' | 'continue' | 'return') => (node: Node, get: () => IR) => {
        const oldEnv = env

        const target = {}
        env = {
            ...oldEnv,

            [type]: {
                target,
            },
        }

        const body = get()

        env = oldEnv

        return irFunctions.Block(node, {
            target,
            body,
        })
    }

    return {
        ...irFunctions,

        error: (node, message) => new CompilerError(getStackTraces(node), message),

        zero: (node) =>
            irFunctions.Value(node, {
                value: 0,
                thisValue: undefined,
                isSuper: false,
            }),

        value: (node, value, thisValue, isSuper = false) =>
            irFunctions.Value(node, {
                value,
                thisValue,
                isSuper,
            }),

        thisValue,
        prototype,

        lexical: (get) => {
            const oldEnv = env

            const declarations = new Map<string, unknown>()
            env = {
                ...oldEnv,

                lexical: {
                    get: (name) =>
                        declarations.has(name) ? declarations.get(name) : oldEnv.lexical.get(name),
                    set: (_, name, value) => declarations.set(name, value),
                },
            }

            const result = get()

            env = oldEnv

            return result
        },
        break: createBlock('break'),
        continue: createBlock('continue'),
        return: createBlock('return'),
        goto: (type, node, value) => {
            const scope = env[type]
            if (!scope) throw new Error(`Unexpected missing ${type} scope`)

            return irFunctions.Break(node, {
                target: scope.target,
                value,
            })
        },
    }
}
