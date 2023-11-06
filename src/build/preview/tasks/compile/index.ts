import { Callback } from '../../../../lib/preview/enums/Callback.js'
import { SNode } from '../../../../snode/nodes/index.js'
import { Project } from '../../project.js'
import { buildArchetypeCallback } from './callback.js'

export type CompileTask = {
    type: 'compile'
    archetype: string
    callback: Callback
    optimizationLevel: 'low' | 'high'
}

export type CompileTaskArtifacts = {
    type: 'compile'
    index: number
    callback: Callback
    result:
        | {
              order: number
              snode: SNode
          }
        | undefined
}

export const buildCompileTask = (project: Project, task: CompileTask): CompileTaskArtifacts => ({
    type: 'compile',
    index: project.engine.previewData.archetypes[task.archetype].index,
    callback: task.callback,
    result: buildArchetypeCallback(
        project.engine.previewData.archetypes[task.archetype],
        task.callback,
        task.optimizationLevel,
        project.engine.previewData.globalResolver,
    ),
})
