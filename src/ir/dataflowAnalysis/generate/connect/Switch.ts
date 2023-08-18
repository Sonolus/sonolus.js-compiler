import { Switch } from '../../../nodes/Switch.js'
import { IR } from '../../../nodes/index.js'
import { connectIns } from './context.js'
import { ConnectIR, connectIR } from './index.js'

export const connectSwitch: ConnectIR<Switch> = (ir, inputs, ctx) => {
    let current = connectIR(ir.discriminant, inputs, ctx)
    const consequences: IR[] = []

    for (const { test, consequent } of ir.cases) {
        current = connectIR(test, current, ctx)
        consequences.push(...connectIR(consequent, current, ctx))
    }

    const defaultCase = connectIR(ir.defaultCase, current, ctx)

    connectIns(ir, [...defaultCase, ...consequences], ctx)

    return [ir]
}
