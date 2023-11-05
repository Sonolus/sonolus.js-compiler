import { Callback } from '../../../../lib/watch/enums/Callback.js'
import { SNode } from '../../../../snode/nodes/index.js'
import { Project } from '../../project.js'
import { buildArchetypeCallback } from './archetypeCallback.js'
import { buildCallback } from './callback.js'

type CompileCallbackTask = {
    type: 'compile'
    callback: (typeof Callback)['UpdateSpawn']
    optimizationLevel: 'low' | 'high'
}

type CompileArchetypeCallbackTask = {
    type: 'compile'
    archetype: string
    callback: Exclude<Callback, (typeof Callback)['UpdateSpawn']>
    optimizationLevel: 'low' | 'high'
}

export type CompileTask = CompileCallbackTask | CompileArchetypeCallbackTask

type CompileCallbackArtifacts = {
    type: 'compile'
    callback: (typeof Callback)['UpdateSpawn']
    result: SNode | undefined
}

type CompileArchetypeCallbackArtifacts = {
    type: 'compile'
    index: number
    callback: Exclude<Callback, (typeof Callback)['UpdateSpawn']>
    result:
        | {
              order: number
              snode: SNode
          }
        | undefined
}

export type CompileTaskArtifacts = CompileCallbackArtifacts | CompileArchetypeCallbackArtifacts

export const buildCompileTask = (project: Project, task: CompileTask): CompileTaskArtifacts => {
    if (task.callback === Callback.UpdateSpawn) {
        return {
            type: 'compile',
            callback: task.callback,
            result: buildCallback(
                project.engine.watchData[task.callback],
                task.callback,
                task.optimizationLevel,
                project.engine.watchData.globalResolver,
            ),
        }
    } else {
        return {
            type: 'compile',
            index: project.engine.watchData.archetypes[task.archetype].index,
            callback: task.callback,
            result: buildArchetypeCallback(
                project.engine.watchData.archetypes[task.archetype],
                task.callback,
                task.optimizationLevel,
                project.engine.watchData.globalResolver,
            ),
        }
    }
}
