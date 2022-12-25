import { mapIR } from '../../map/index.js'
import { Get } from '../../nodes/Get.js'
import { TransformIR } from './index.js'

export const transformGet: TransformIR<Get> = mapIR
