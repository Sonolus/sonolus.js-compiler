export type InstanceId<T extends string> = 0 | (number & { __instanceIdType: T })
