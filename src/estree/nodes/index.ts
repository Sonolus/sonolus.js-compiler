declare module 'estree' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface BaseNode {
        sourceFile: string
        start: number
        end: number
    }
}
