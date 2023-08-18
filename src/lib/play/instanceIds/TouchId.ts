import { DataType } from '../../shared/containers/DataType.js'
import { InstanceId } from '../../shared/instanceIds/InstanceId.js'

export type TouchId = InstanceId<'Touch'>

export const TouchId = DataType<TouchId>
