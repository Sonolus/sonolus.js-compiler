import { memoize } from '../../utils/memoization.js'
import { compileJS } from './index.js'

export const compileJSFunction = memoize(
    (value: unknown) =>
        compileExpressionFunction(value) ??
        compileGetterSetterFunction(value) ??
        compileClassFunction(value),
)

const compileExpressionFunction = (value: unknown) => {
    try {
        let root
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const source = `_ = \n${value}\n`

        root = compileJS(source)
        if (root.body.length !== 1) return

        root = root.body[0]
        if (root.type !== 'ExpressionStatement') return

        root = root.expression
        if (root.type !== 'AssignmentExpression') return

        root = root.right
        if (root.type !== 'ArrowFunctionExpression' && root.type !== 'FunctionExpression') return

        return root
    } catch (error) {
        return
    }
}

const compileGetterSetterFunction = (value: unknown) => {
    try {
        let root
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const source = `_ = function\n${value}\n`

        root = compileJS(source)
        if (root.body.length !== 1) return

        root = root.body[0]
        if (root.type !== 'ExpressionStatement') return

        root = root.expression
        if (root.type !== 'AssignmentExpression') return

        root = root.right
        if (root.type !== 'FunctionExpression') return

        return root
    } catch (error) {
        return
    }
}

const compileClassFunction = (value: unknown) => {
    try {
        let root
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const source = `class _ {\n${value}\n}`

        root = compileJS(source)
        if (root.body.length !== 1) return

        root = root.body[0]
        if (root.type !== 'ClassDeclaration') return

        root = root.body
        if (root.body.length !== 1) return

        root = root.body[0]
        if (root.type !== 'MethodDefinition') return

        root = root.value

        return root
    } catch (error) {
        return
    }
}
