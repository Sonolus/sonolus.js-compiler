export type Id<T extends string> = number & { __idType: T }
