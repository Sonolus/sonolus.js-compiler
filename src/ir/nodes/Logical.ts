import { BaseIR, IR } from './index.js'

export type LogicalOperator = '||' | '&&' | '??'

export type Logical = BaseIR & {
    type: 'Logical'
    operator: LogicalOperator
    lhs: IR
    rhs: IR
}

export type LogicalChildren = [lhs: IR, rhs: IR]
