import { Intrinsic } from './index.js'

type HasIntrinsic<K extends keyof typeof Intrinsic> = (value: unknown) => value is Intrinsic<K>

const createHasIntrinsic =
    <K extends keyof typeof Intrinsic>(intrinsic: K) =>
    (value: unknown): value is Intrinsic<K> =>
        !!value &&
        (typeof value === 'object' || typeof value === 'function') &&
        Intrinsic[intrinsic] in value

export const hasIntrinsicCall: HasIntrinsic<'Call'> = createHasIntrinsic('Call')
export const hasIntrinsicGet: HasIntrinsic<'Get'> = createHasIntrinsic('Get')
export const hasIntrinsicSet: HasIntrinsic<'Set'> = createHasIntrinsic('Set')
export const hasIntrinsicIterate: HasIntrinsic<'Iterate'> = createHasIntrinsic('Iterate')
