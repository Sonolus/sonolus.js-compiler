import { createCompileESTreeContext } from '../../../estree/compile/context.js'
import { compileFunctionCall } from '../../../estree/compile/utils/function.js'
import { hasIntrinsicCall } from '../../../intrinsic/has.js'
import { Intrinsic } from '../../../intrinsic/index.js'
import { compileJSFunction } from '../../../js/compile/function.js'
import { searchPrototype } from '../../../utils/prototype.js'
import { Call } from '../../nodes/Call.js'
import { IR } from '../../nodes/index.js'
import { transformIR, TransformIR } from './index.js'
import { isConstant, rewriteAsExecute, transformIRAndGet } from './utils.js'

export const transformCall: TransformIR<Call> = (ir, ctx) => {
    const callee = transformIR(ir.callee, ctx)
    const args = transformIRAndGet(ir.args, ctx)

    const calleeResult = isConstant(callee)
    if (!calleeResult) return { ...ir, callee, args }

    const argsResult = isConstant(args)
    if (!argsResult) return { ...ir, callee, args }

    if (hasIntrinsicCall(calleeResult.value))
        return rewriteAsExecute(ir, ctx, [
            callee,
            args,
            calleeResult.value[Intrinsic.Call](
                ir,
                calleeResult.thisValue,
                argsResult.value as unknown[],
                ctx,
            ),
        ])

    if (typeof calleeResult.value !== 'function') return { ...ir, callee, args }

    const calls = callFunction(
        ir,
        calleeResult.thisValue,
        calleeResult.value,
        argsResult.value as unknown[],
    )
    if (!calls) return { ...ir, callee, args }

    return rewriteAsExecute(ir, ctx, [callee, args, ...calls])
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
