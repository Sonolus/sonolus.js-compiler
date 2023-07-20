import { DataType } from '../containers/DataType.js'
import { InstanceId } from './InstanceId.js'

export type TouchId = InstanceId<'Touch'>

export const TouchId = DataType<TouchId>
