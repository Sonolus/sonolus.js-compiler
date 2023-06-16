declare const instanceIdType: unique symbol

export type InstanceId<T extends string> = 0 | (number & { [instanceIdType]: T })
