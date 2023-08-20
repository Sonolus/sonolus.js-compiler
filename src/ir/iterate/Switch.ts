import { Switch } from '../nodes/Switch.js'
import { IterateIR } from './index.js'

export const iterateSwitch: IterateIR<Switch> = (ir) => [
    ir.discriminant,
    ir.defaultCase,
    ...ir.cases.flatMap(({ test, consequent }) => [test, consequent]),
]
