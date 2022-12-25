import { BaseIR, IR } from './index.js'

export type AssignOperator = '=' | '+=' | '-=' | '*=' | '/=' | '%=' | '**=' | '||=' | '&&=' | '??='

export type Assign = BaseIR & {
    type: 'Assign'
    operator: AssignOperator
    lhs: IR
    rhs: IR
}

export type AssignChildren = [lhs: IR, rhs: IR]
