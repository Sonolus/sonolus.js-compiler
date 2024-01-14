import { defineLib } from '../shared/define/lib.js'
import { input as _input } from '../shared/input.js'
import { preprocessWritablePointer } from './utils/pointer.js'

type Input = {
    readonly offset: number
} & typeof _input

export const input = defineLib<Input>({
    offset: preprocessWritablePointer(1000, 3, 0, 0),

    ..._input,
})
