import { Get } from '../../nodes/Get.js'
import { TransformIR } from './index.js'

export const transformGet: TransformIR<Get> = (ir) => ({ ...ir })
