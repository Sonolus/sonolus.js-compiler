import { Static, Type } from '@sinclair/typebox'
import { EngineConfigurationUI } from '@sonolus/core'
import { clean } from '../../../../utils/clean.js'

const EngineConfigurationMetric = Type.Union([
    Type.Literal('arcade'),
    Type.Literal('arcadePercentage'),
    Type.Literal('accuracy'),
    Type.Literal('accuracyPercentage'),
    Type.Literal('life'),
    Type.Literal('perfect'),
    Type.Literal('perfectPercentage'),
    Type.Literal('greatGoodMiss'),
    Type.Literal('greatGoodMissPercentage'),
    Type.Literal('miss'),
    Type.Literal('missPercentage'),
    Type.Literal('errorHeatmap'),
])

const EngineConfigurationVisibility = Type.Object({
    scale: Type.Number(),
    alpha: Type.Number(),
})

const EngineConfigurationAnimationTween = Type.Object({
    from: Type.Number(),
    to: Type.Number(),
    duration: Type.Number(),
    ease: Type.Union([
        Type.Literal('linear'),
        Type.TemplateLiteral([
            Type.Union([
                Type.Literal('in'),
                Type.Literal('out'),
                Type.Literal('inOut'),
                Type.Literal('outIn'),
            ]),
            Type.Union([
                Type.Literal('Sine'),
                Type.Literal('Quad'),
                Type.Literal('Cubic'),
                Type.Literal('Quart'),
                Type.Literal('Quint'),
                Type.Literal('Expo'),
                Type.Literal('Circ'),
                Type.Literal('Back'),
                Type.Literal('Elastic'),
            ]),
        ]),
        Type.Literal('none'),
    ]),
})

const EngineConfigurationAnimation = Type.Object({
    scale: EngineConfigurationAnimationTween,
    alpha: EngineConfigurationAnimationTween,
})

const EngineConfigurationJudgmentErrorStyle = Type.Union([
    Type.Literal('none'),
    Type.Literal('plus'),
    Type.Literal('minus'),
    Type.Literal('arrowUp'),
    Type.Literal('arrowDown'),
    Type.Literal('arrowLeft'),
    Type.Literal('arrowRight'),
    Type.Literal('triangleUp'),
    Type.Literal('triangleDown'),
    Type.Literal('triangleLeft'),
    Type.Literal('triangleRight'),
])

const EngineConfigurationJudgmentErrorPlacement = Type.Union([
    Type.Literal('both'),
    Type.Literal('left'),
    Type.Literal('right'),
])

const schema = Type.Object({
    scope: Type.Optional(Type.String()),
    primaryMetric: EngineConfigurationMetric,
    secondaryMetric: EngineConfigurationMetric,
    menuVisibility: EngineConfigurationVisibility,
    judgmentVisibility: EngineConfigurationVisibility,
    comboVisibility: EngineConfigurationVisibility,
    primaryMetricVisibility: EngineConfigurationVisibility,
    secondaryMetricVisibility: EngineConfigurationVisibility,
    progressVisibility: EngineConfigurationVisibility,
    tutorialNavigationVisibility: EngineConfigurationVisibility,
    tutorialInstructionVisibility: EngineConfigurationVisibility,
    judgmentAnimation: EngineConfigurationAnimation,
    comboAnimation: EngineConfigurationAnimation,
    judgmentErrorStyle: EngineConfigurationJudgmentErrorStyle,
    judgmentErrorPlacement: EngineConfigurationJudgmentErrorPlacement,
    judgmentErrorMin: Type.Number(),
})

type _Test<T extends Static<typeof schema> = EngineConfigurationUI> = T

export const buildUI = (ui: EngineConfigurationUI): EngineConfigurationUI => clean(schema, ui)
