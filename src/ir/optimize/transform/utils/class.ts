import { ClassDeclaration, ClassExpression } from 'estree'
import { createCompileESTreeContext } from '../../../../estree/compile/context.js'
import { compileESTree } from '../../../../estree/compile/index.js'
import { compileFunctionCall } from '../../../../estree/compile/utils/function.js'
import { compileObjectKey } from '../../../../estree/compile/utils/object.js'
import { compileJSClass } from '../../../../js/compile/class.js'
import { IR } from '../../../nodes/index.js'
import { TransformIRContext } from '../context.js'

export const callClassConstructor = (
    ir: IR,
    instance: object,
    prototype: Function,
    args: unknown[],
    ctx: TransformIRContext,
): IR[] => {
    const calls: IR[] = []

    const node = compileJSClass(prototype.constructor)
    if (!node) throw ctx.error(ir, 'Cannot construct')

    const estreeCtx = createCompileESTreeContext(ir.stackTraces, instance, prototype, ir.env)

    if (!node.superClass) {
        calls.push(...initializeClassFields(ir, instance, prototype, ctx))
    }

    const ctor = findConstructor(node)
    if (ctor) {
        calls.push(...compileFunctionCall(ctor, ctor.params, ctor.body, args, estreeCtx))
    } else if (node.superClass) {
        calls.push(
            ...callClassConstructor(ir, instance, Object.getPrototypeOf(prototype), args, ctx),
        )
        calls.push(...initializeClassFields(ir, instance, prototype, ctx))
    }

    return calls
}

export const initializeClassFields = (
    ir: IR,
    instance: object,
    prototype: Function,
    ctx: TransformIRContext,
): IR[] => {
    const inits: IR[] = []

    const node = compileJSClass(prototype.constructor)
    if (!node) throw ctx.error(ir, 'Cannot construct')

    const estreeCtx = createCompileESTreeContext(ir.stackTraces, instance, prototype, ir.env)

    for (const body of node.body.body) {
        if (body.type !== 'PropertyDefinition') continue
        if (body.static) continue

        if (!body.value) throw estreeCtx.error(body, 'Property must be initialized on declaration')

        inits.push(
            estreeCtx.ObjectAdd(body, {
                object: instance,
                kind: 'init',
                key: compileObjectKey(body.key, body.computed, estreeCtx),
                value: compileESTree(body.value, estreeCtx),
            }),
        )
    }

    return inits
}

const findConstructor = (node: ClassDeclaration | ClassExpression) => {
    for (const body of node.body.body) {
        if (body.type !== 'MethodDefinition') continue
        if (body.kind !== 'constructor') continue

        return body.value
    }
}
