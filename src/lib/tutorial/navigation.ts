import { defineLib } from '../shared/define/lib.js'
import { NavigationDirection } from './enums/NavigationDirection.js'
import { readonlyPointer } from './utils/pointer.js'

type Navigation = {
    readonly direction: NavigationDirection
}

export const navigation = defineLib<Navigation>({
    direction: readonlyPointer(1001, 2, 0, 0),
})
