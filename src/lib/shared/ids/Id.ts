declare const idType: unique symbol

export type Id<T extends string> = number & { [idType]: T }
