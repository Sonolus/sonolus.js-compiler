import { Switch } from '../nodes/Switch.js'
import { CompileIR } from './index.js'

export const compileSwitch: CompileIR<Switch> = (ir, ctx) =>
    ctx.func(
        'SwitchWithDefault',
        ir.discriminant,
        ...ir.cases.flatMap(({ test, consequent }) => [test, consequent]),
        ir.defaultCase,
    )
