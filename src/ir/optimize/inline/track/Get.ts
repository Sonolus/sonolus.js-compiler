import { Get } from '../../../nodes/Get.js'
import { TrackInlineIR } from './index.js'

export const trackInlineGet: TrackInlineIR<Get> = (ir) => ({
    sideEffect: false,
    dependencies: [ir.target],
})
