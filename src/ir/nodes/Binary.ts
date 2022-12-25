import { BaseIR, IR } from './index.js'

export type BinaryOperator =
    | '=='
    | '!='
    | '==='
    | '!=='
    | '<'
    | '<='
    | '>'
    | '>='
    | '<<'
    | '>>'
    | '>>>'
    | '+'
    | '-'
    | '*'
    | '/'
    | '%'
    | '**'
    | '|'
    | '^'
    | '&'
    | 'in'
    | 'instanceof'

export type Binary = BaseIR & {
    type: 'Binary'
    operator: BinaryOperator
    lhs: IR
    rhs: IR
}

export type BinaryChildren = [lhs: IR, rhs: IR]
