import { memoize } from '../../utils/memoization.js'
import { compileJS } from './index.js'

export const compileJSClass = memoize(
    (value: unknown) => compileClassDeclaration(value) ?? compileClassExpression(value),
)

const compileClassDeclaration = (value: unknown) => {
    try {
        let root
        const source = `\n${value}\n`

        root = compileJS(source)
        if (root.body.length !== 1) return

        root = root.body[0]
        if (root.type !== 'ClassDeclaration') return

        return root
    } catch (error) {
        return
    }
}

const compileClassExpression = (value: unknown) => {
    try {
        let root
        const source = `_ = \n${value}\n`

        root = compileJS(source)
        if (root.body.length !== 1) return

        root = root.body[0]
        if (root.type !== 'ExpressionStatement') return

        root = root.expression
        if (root.type !== 'AssignmentExpression') return

        root = root.right
        if (root.type !== 'ClassExpression') return

        return root
    } catch (error) {
        return
    }
}
