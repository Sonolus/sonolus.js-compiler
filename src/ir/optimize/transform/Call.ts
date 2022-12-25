import { createCompileESTreeContext } from '../../../estree/compile/context.js'
import { compileFunctionCall } from '../../../estree/compile/utils/function.js'
import { hasIntrinsicCall } from '../../../intrinsic/has.js'
import { Intrinsic } from '../../../intrinsic/index.js'
import { compileJSFunction } from '../../../js/compile/function.js'
import { searchPrototype } from '../../../utils/prototype.js'
import { mapIR } from '../../map/index.js'
import { Call } from '../../nodes/Call.js'
import { IR } from '../../nodes/index.js'
import { transformIR, TransformIR } from './index.js'
import { isConstant, isResolved, rewriteAsExecute, transformIRAndGet } from './utils.js'

export const transformCall: TransformIR<Call> = (ir, ctx) => {
    const callee = transformIR(ir.callee, ctx)
    const init = transformIRAndGet(ir.args.init, ctx)
    const newIR = mapIR(ir, callee, init)

    const result = isConstant(callee)
    if (!result) return newIR

    if (!isResolved(init)) return newIR

    if (hasIntrinsicCall(result.value))
        return rewriteAsExecute(newIR, ctx, [
            callee,
            init,
            result.value[Intrinsic.Call](newIR, result.thisValue, newIR.args.value, ctx),
        ])

    if (typeof result.value !== 'function') return newIR

    const calls = callFunction(newIR, result.thisValue, result.value, newIR.args.value)
    if (!calls) return newIR

    return rewriteAsExecute(newIR, ctx, [callee, init, ...calls])
}

const callFunction = (ir: IR, thisValue: unknown, func: Function, args: unknown[]) => {
    const node = compileJSFunction(func)
    if (!node) return

    const estreeCtx = createCompileESTreeContext(
        ir.stackTraces,
        thisValue,
        searchPrototype(thisValue, func),
        ir.env,
    )
    return compileFunctionCall(node, node.params, node.body, args, estreeCtx)
}
