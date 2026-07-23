declare module 'estree' {
    interface BaseNode {
        sourceFile: string
        start: number
        end: number
    }
}
