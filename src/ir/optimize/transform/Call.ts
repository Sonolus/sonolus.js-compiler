import { createCompileESTreeContext } from '../../../estree/compile/context.js'
import { compileFunctionCall } from '../../../estree/compile/utils/function.js'
import { hasIntrinsicCall } from '../../../intrinsic/has.js'
import { Intrinsic } from '../../../intrinsic/index.js'
import { compileJSFunction } from '../../../js/compile/function.js'
import { searchPrototype } from '../../../utils/prototype.js'
import { Call } from '../../nodes/Call.js'
import { IR } from '../../nodes/index.js'
import { transformIR, TransformIR } from './index.js'
import { isConstant, isResolved, rewriteAsExecute, transformIRAndGet } from './utils.js'

export const transformCall: TransformIR<Call> = (ir, ctx) => {
    const callee = transformIR(ir.callee, ctx)
    const args = {
        init: transformIRAndGet(ir.args.init, ctx),
        value: ir.args.value,
    }

    const result = isConstant(callee)
    if (!result) return { ...ir, callee, args }

    if (!isResolved(args.init)) return { ...ir, callee, args }

    if (hasIntrinsicCall(result.value))
        return rewriteAsExecute(ir, ctx, [
            callee,
            args.init,
            result.value[Intrinsic.Call](ir, result.thisValue, args.value, ctx),
        ])

    if (typeof result.value !== 'function') return { ...ir, callee, args }

    const calls = callFunction(ir, result.thisValue, result.value, args.value)
    if (!calls) return { ...ir, callee, args }

    return rewriteAsExecute(ir, ctx, [callee, args.init, ...calls])
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
