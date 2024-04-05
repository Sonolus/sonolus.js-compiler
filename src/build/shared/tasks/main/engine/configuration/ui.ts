import {
    EngineConfigurationAnimation,
    EngineConfigurationAnimationTween,
    EngineConfigurationUI,
    EngineConfigurationVisibility,
} from '@sonolus/core'
import { Schema, clean } from '../../../../utils/clean.js'

export const buildUI = (ui: EngineConfigurationUI): EngineConfigurationUI =>
    clean(ui, {
        'scope?': 'string',
        primaryMetric: 'string',
        secondaryMetric: 'string',
        menuVisibility: visibility,
        judgmentVisibility: visibility,
        comboVisibility: visibility,
        primaryMetricVisibility: visibility,
        secondaryMetricVisibility: visibility,
        progressVisibility: visibility,
        tutorialNavigationVisibility: visibility,
        tutorialInstructionVisibility: visibility,
        judgmentAnimation: animation,
        comboAnimation: animation,
        judgmentErrorStyle: 'string',
        judgmentErrorPlacement: 'string',
        judgmentErrorMin: 'number',
    })

const visibility: Schema<EngineConfigurationVisibility> = {
    scale: 'number',
    alpha: 'number',
}

const tween: Schema<EngineConfigurationAnimationTween> = {
    from: 'number',
    to: 'number',
    duration: 'number',
    ease: 'string',
}

const animation: Schema<EngineConfigurationAnimation> = {
    scale: tween,
    alpha: tween,
}
