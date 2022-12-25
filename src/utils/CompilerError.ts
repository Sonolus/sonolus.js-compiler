export type StackTrace = {
    readonly source: string
    readonly start: number
    readonly end: number
}

export class CompilerError extends Error {
    constructor(stackTrances: StackTrace[], message: string) {
        super([message, ...stackTrances.map(printStackTrace), message].join('\n\n'))
    }
}

const printStackTrace = ({ source, start, end }: StackTrace) => {
    let i = -1
    const lines = source.split('\n').map((line) => [(i += 1), (i += line.length), line] as const)

    const indexes = {
        min: lines.findIndex(([s, e]) => start >= s && start < e),
        max: lines.findIndex(([, e]) => end <= e),
    }

    const displayIndexes = {
        min: Math.max(1, indexes.min - 2),
        max: Math.min(indexes.max + 2, lines.length - 2),
    }

    const lineNumberLength = Math.max(2, `${displayIndexes.max}`.length)

    return lines
        .slice(displayIndexes.min, displayIndexes.max + 1)
        .flatMap(([s, e, l], i) => {
            const lineNumber = displayIndexes.min + i
            const line = `${`${lineNumber}`.padStart(lineNumberLength, ' ')} | ${l}`
            if (e < start || s >= end) return [line]

            const pointers = [...Array(e - s).keys()]
                .map((i) => i + s)
                .map((i) => (i >= start && i < end ? '^' : ' '))
                .join('')

            return [line, `${' '.repeat(lineNumberLength)} | ${pointers}`]
        })
        .join('\n')
}
