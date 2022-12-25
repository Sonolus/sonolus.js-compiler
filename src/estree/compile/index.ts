import { Node } from 'estree'
import { IR } from '../../ir/nodes/index.js'
import { visit } from '../../utils/visitor.js'
import { compileIdentifier } from './Identifier.js'
import { compileLiteral } from './Literal.js'
import { compileSuper } from './Super.js'
import { CompileESTreeContext } from './context.js'
import { compileVariableDeclaration } from './declarations/VariableDeclaration.js'
import { compileArrayExpression } from './expressions/ArrayExpression.js'
import { compileArrowFunctionExpression } from './expressions/ArrowFunctionExpression.js'
import { compileAssignmentExpression } from './expressions/AssignmentExpression.js'
import { compileBinaryExpression } from './expressions/BinaryExpression.js'
import { compileCallExpression } from './expressions/CallExpression.js'
import { compileConditionalExpression } from './expressions/ConditionalExpression.js'
import { compileFunctionExpression } from './expressions/FunctionExpression.js'
import { compileLogicalExpression } from './expressions/LogicalExpression.js'
import { compileMemberExpression } from './expressions/MemberExpression.js'
import { compileNewExpression } from './expressions/NewExpression.js'
import { compileObjectExpression } from './expressions/ObjectExpression.js'
import { compileSequenceExpression } from './expressions/SequenceExpression.js'
import { compileTemplateLiteral } from './expressions/TemplateLiteral.js'
import { compileThisExpression } from './expressions/ThisExpression.js'
import { compileUnaryExpression } from './expressions/UnaryExpression.js'
import { compileUpdateExpression } from './expressions/UpdateExpression.js'
import { compileBlockStatement } from './statements/BlockStatement.js'
import { compileBreakStatement } from './statements/BreakStatement.js'
import { compileContinueStatement } from './statements/ContinueStatement.js'
import { compileDoWhileStatement } from './statements/DoWhileStatement.js'
import { compileEmptyStatement } from './statements/EmptyStatement.js'
import { compileExpressionStatement } from './statements/ExpressionStatement.js'
import { compileForOfStatement } from './statements/ForOfStatement.js'
import { compileForStatement } from './statements/ForStatement.js'
import { compileIfStatement } from './statements/IfStatement.js'
import { compileReturnStatement } from './statements/ReturnStatement.js'
import { compileThrowStatement } from './statements/ThrowStatement.js'
import { compileWhileStatement } from './statements/WhileStatement.js'

export type CompileESTree<N extends Node> = (node: N, ctx: CompileESTreeContext) => IR

export const compileESTree = visit<CompileESTree<Node>>().create(
    'compile',
    {
        compileArrayExpression,
        compileArrowFunctionExpression,
        compileAssignmentExpression,
        compileBinaryExpression,
        compileBlockStatement,
        compileBreakStatement,
        compileCallExpression,
        compileConditionalExpression,
        compileContinueStatement,
        compileDoWhileStatement,
        compileEmptyStatement,
        compileExpressionStatement,
        compileForStatement,
        compileForOfStatement,
        compileFunctionExpression,
        compileIdentifier,
        compileIfStatement,
        compileLiteral,
        compileLogicalExpression,
        compileMemberExpression,
        compileNewExpression,
        compileObjectExpression,
        compileReturnStatement,
        compileSequenceExpression,
        compileSuper,
        compileTemplateLiteral,
        compileThisExpression,
        compileThrowStatement,
        compileUnaryExpression,
        compileUpdateExpression,
        compileVariableDeclaration,
        compileWhileStatement,
    },
    (node, ctx) => {
        throw ctx.error(node, `${node.type} is not supported`)
    },
)
