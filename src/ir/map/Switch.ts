import { Switch } from '../nodes/Switch.js'
import { createMapIRVisitor } from './utils.js'

export const mapSwitch = createMapIRVisitor<Switch>(
    (_, discriminant, defaultCase, ...casePairs) => ({
        discriminant,
        defaultCase,
        cases: casePairs
            .filter((_, i) => i % 2 === 0)
            .map((test, i) => ({
                test,
                consequent: casePairs[i * 2 + 1],
            })),
    }),
)
