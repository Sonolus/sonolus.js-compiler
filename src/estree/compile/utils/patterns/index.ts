import { ArrayPattern, AssignmentPattern, ObjectPattern, Pattern } from 'estree'
import { IR } from '../../../../ir/nodes/index.js'
import { CompileESTreeContext } from '../../context.js'
import { compileESTree } from '../../index.js'
import { compileObjectKey } from '../object.js'

export type CompileLeaf = (node: Pattern, value: IR, ctx: CompileESTreeContext) => IR[]

export const compilePattern = (
    node: Pattern,
    value: IR,
    ctx: CompileESTreeContext,
    compileLeaf: CompileLeaf,
): IR[] => {
    switch (node.type) {
        case 'ArrayPattern':
            return compileArrayPattern(node, value, ctx, compileLeaf)
        case 'AssignmentPattern':
            return compileAssignmentPattern(node, value, ctx, compileLeaf)
        case 'ObjectPattern':
            return compileObjectPattern(node, value, ctx, compileLeaf)
        default:
            return compileLeaf(node, value, ctx)
    }
}

const compileArrayPattern = (
    node: ArrayPattern,
    value: IR,
    ctx: CompileESTreeContext,
    compileLeaf: CompileLeaf,
) => {
    const target = {}

    const destructs: IR[] = []

    for (const element of node.elements) {
        if (!element) {
            destructs.push(
                ctx.ArrayDestructorGet(node, {
                    target,
                }),
            )
            continue
        }

        if (element.type === 'RestElement') {
            const restValue = ctx.ArrayDestructorRest(element, {
                target,
            })

            destructs.push(...compilePattern(element.argument, restValue, ctx, compileLeaf))
            continue
        }

        const elementValue = ctx.ArrayDestructorGet(element, {
            target,
        })

        destructs.push(...compilePattern(element, elementValue, ctx, compileLeaf))
    }

    return [
        ctx.ArrayDestructor(node, {
            array: value,
            target,
        }),
        ...destructs,
    ]
}

const compileAssignmentPattern = (
    node: AssignmentPattern,
    value: IR,
    ctx: CompileESTreeContext,
    compileLeaf: CompileLeaf,
) =>
    compilePattern(
        node.left,
        ctx.Logical(node, {
            operator: '??',
            lhs: value,
            rhs: compileESTree(node.right, ctx),
        }),
        ctx,
        compileLeaf,
    )

const compileObjectPattern = (
    node: ObjectPattern,
    value: IR,
    ctx: CompileESTreeContext,
    compileLeaf: CompileLeaf,
) => {
    const target = {
        object: undefined,
    }

    const destructs: IR[] = []

    for (const property of node.properties) {
        if (property.type === 'RestElement') {
            const restValue = ctx.ObjectDestructorRest(property, {
                target,
            })

            destructs.push(...compilePattern(property.argument, restValue, ctx, compileLeaf))
            continue
        }

        const propertyValue = ctx.ObjectDestructorGet(property, {
            target,
            key: compileObjectKey(property.key, property.computed, ctx),
        })

        destructs.push(...compilePattern(property.value, propertyValue, ctx, compileLeaf))
    }

    return [
        ctx.ObjectDestructor(node, {
            object: value,
            target,
        }),
        ...destructs,
    ]
}
