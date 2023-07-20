import { TutorialCallback } from '../../../../lib/tutorial/index.js'
import { SNode } from '../../../../snode/nodes/index.js'
import { Project } from '../../project.js'
import { buildArchetypeCallback } from './callback.js'

export type CompileTask = {
    type: 'compile'
    callback: TutorialCallback
    optimizationLevel: 'low' | 'high'
}

export type CompileTaskArtifacts = {
    type: 'compile'
    callback: TutorialCallback
    result: SNode | undefined
}

export const buildCompileTask = (project: Project, task: CompileTask): CompileTaskArtifacts => ({
    type: 'compile',
    callback: task.callback,
    result: buildArchetypeCallback(
        project.engine.tutorialData.tutorial,
        task.callback,
        task.optimizationLevel,
        project.engine.tutorialData.globalResolver,
    ),
})
