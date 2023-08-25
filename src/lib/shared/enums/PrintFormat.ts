export const PrintFormat = {
    Number: 0,
    Percentage: 1,

    Time: 10,
    Score: 11,

    BPM: 20,
    TimeScale: 21,

    BeatCount: 30,
    MeasureCount: 31,
    EntityCount: 32,
} as const

export type PrintFormat = (typeof PrintFormat)[keyof typeof PrintFormat]
