import { ArchetypeCallback } from '../../../lib/enums/ArchetypeCallback.js'
import { SNode } from '../../../snode/nodes/index.js'
import { Project } from '../../project.js'
import { buildArchetypeCallback } from './callback.js'

export type CompileTask = {
    type: 'compile'
    archetype: string
    callback: ArchetypeCallback
    optimizationLevel: 'low' | 'high'
}

export type CompileTaskArtifacts = {
    type: 'compile'
    index: number
    callback: ArchetypeCallback
    result:
        | {
              order: number
              snode: SNode
          }
        | undefined
}

export const buildCompileTask = (project: Project, task: CompileTask): CompileTaskArtifacts => ({
    type: 'compile',
    index: project.engine.data.archetypes[task.archetype].index,
    callback: task.callback,
    result: buildArchetypeCallback(
        project.engine.data.archetypes[task.archetype],
        task.callback,
        task.optimizationLevel,
        project.engine.data.globalResolver,
    ),
})
