import { RuntimeFunction } from '@sonolus/core'
import { Intrinsic } from '../../intrinsic/index.js'

const createNative = (func: RuntimeFunction, argCount: number): Intrinsic<'Call'> => ({
    [Intrinsic.Call]: (ir, _, args, ctx) => {
        if (argCount !== Infinity && args.length !== argCount)
            throw ctx.error(ir, `Must be ${argCount} arguments`)

        return ctx.Native(ir, {
            func,
            args: args.map((arg) => ctx.value(ir, arg)),
        })
    },
})

const defineNative = <T extends Record<string, (...args: never[]) => unknown>>(native: {
    [K in keyof T]: K extends RuntimeFunction ? Parameters<T[K]>['length'] : never
}) =>
    Object.fromEntries(
        Object.entries(native).map(([func, argCount]) => [
            func,
            createNative(func as never, argCount as number),
        ]),
    ) as unknown as T

export const native = defineNative<{
    Add(...values: number[]): number
    Multiply(...values: number[]): number
    Divide(...values: number[]): number
    Rem(...values: number[]): number
    Mod(...values: number[]): number
    Power(...values: number[]): number
    Log(value: number): number
    Negate(value: number): number

    Equal(lhs: number, rhs: number): number
    NotEqual(lhs: number, rhs: number): number
    Greater(lhs: number, rhs: number): number
    GreaterOr(lhs: number, rhs: number): number
    Less(lhs: number, rhs: number): number
    LessOr(lhs: number, rhs: number): number

    Not(value: number): number

    Abs(value: number): number
    Sign(value: number): number
    Min(x: number, y: number): number
    Max(x: number, y: number): number

    Ceil(value: number): number
    Floor(value: number): number
    Round(value: number): number
    Frac(value: number): number
    Trunc(value: number): number

    Degree(value: number): number
    Radian(value: number): number

    Sin(value: number): number
    Cos(value: number): number
    Tan(value: number): number

    Sinh(value: number): number
    Cosh(value: number): number
    Tanh(value: number): number

    Arcsin(value: number): number
    Arccos(value: number): number
    Arctan(value: number): number
    Arctan2(y: number, x: number): number

    Clamp(x: number, a: number, b: number): number
    Lerp(x: number, y: number, s: number): number
    LerpClamped(x: number, y: number, s: number): number
    Unlerp(a: number, b: number, x: number): number
    UnlerpClamped(a: number, b: number, x: number): number
    Remap(a: number, b: number, c: number, d: number, x: number): number
    RemapClamped(a: number, b: number, c: number, d: number, x: number): number

    Random(min: number, max: number): number
    RandomInteger(min: number, max: number): number

    Get(id: number, index: number): number
    GetShifted(id: number, x: number, y: number, s: number): number
    GetPointed(id: number, index: number, offset: number): number

    Set(id: number, index: number, value: number): number
    SetAdd(id: number, index: number, value: number): number
    SetSubtract(id: number, index: number, value: number): number
    SetMultiply(id: number, index: number, value: number): number
    SetDivide(id: number, index: number, value: number): number
    SetRem(id: number, index: number, value: number): number
    SetMod(id: number, index: number, value: number): number
    SetPower(id: number, index: number, value: number): number
    SetShifted(id: number, x: number, y: number, s: number, value: number): number
    SetAddShifted(id: number, x: number, y: number, s: number, value: number): number
    SetSubtractShifted(id: number, x: number, y: number, s: number, value: number): number
    SetMultiplyShifted(id: number, x: number, y: number, s: number, value: number): number
    SetDivideShifted(id: number, x: number, y: number, s: number, value: number): number
    SetRemShifted(id: number, x: number, y: number, s: number, value: number): number
    SetModShifted(id: number, x: number, y: number, s: number, value: number): number
    SetPowerShifted(id: number, x: number, y: number, s: number, value: number): number
    SetPointed(id: number, index: number, offset: number, value: number): number
    SetAddPointed(id: number, index: number, offset: number, value: number): number
    SetSubtractPointed(id: number, index: number, offset: number, value: number): number
    SetMultiplyPointed(id: number, index: number, offset: number, value: number): number
    SetDividePointed(id: number, index: number, offset: number, value: number): number
    SetRemPointed(id: number, index: number, offset: number, value: number): number
    SetModPointed(id: number, index: number, offset: number, value: number): number
    SetPowerPointed(id: number, index: number, offset: number, value: number): number

    Copy(srcId: number, srcIndex: number, dstId: number, dstIndex: number, count: number): void

    IncrementPre(id: number, index: number): number
    IncrementPreShifted(id: number, x: number, y: number, s: number): number
    IncrementPrePointed(id: number, index: number, offset: number): number
    IncrementPost(id: number, index: number): number
    IncrementPostShifted(id: number, x: number, y: number, s: number): number
    IncrementPostPointed(id: number, index: number, offset: number): number
    DecrementPre(id: number, index: number): number
    DecrementPreShifted(id: number, x: number, y: number, s: number): number
    DecrementPrePointed(id: number, index: number, offset: number): number
    DecrementPost(id: number, index: number): number
    DecrementPostShifted(id: number, x: number, y: number, s: number): number
    DecrementPostPointed(id: number, index: number, offset: number): number

    StackInit(): void
    StackPush(value: number): number
    StackPop(): number
    StackGrow(size: number): number
    StackEnter(size: number): void
    StackLeave(): void
    StackGet(offset: number): number
    StackSet(offset: number, value: number): number
    StackGetPointer(): number
    StackSetPointer(value: number): number
    StackGetFrame(offset: number): number
    StackSetFrame(offset: number, value: number): number
    StackGetFramePointer(): number
    StackSetFramePointer(value: number): number

    ExportValue(index: number, value: number | boolean): void

    BeatToBPM(beat: number): number
    BeatToTime(beat: number): number
    BeatToStartingBeat(beat: number): number
    BeatToStartingTime(beat: number): number

    TimeToTimeScale(time: number): number
    TimeToScaledTime(time: number): number
    TimeToStartingTime(time: number): number
    TimeToStartingScaledTime(time: number): number

    Draw(
        id: number,
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        x3: number,
        y3: number,
        x4: number,
        y4: number,
        z: number,
        a: number,
    ): void
    DrawCurvedL(
        id: number,
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        x3: number,
        y3: number,
        x4: number,
        y4: number,
        z: number,
        a: number,
        n: number,
        p: number,
        q: number,
    ): void
    DrawCurvedR(
        id: number,
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        x3: number,
        y3: number,
        x4: number,
        y4: number,
        z: number,
        a: number,
        n: number,
        p: number,
        q: number,
    ): void
    DrawCurvedLR(
        id: number,
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        x3: number,
        y3: number,
        x4: number,
        y4: number,
        z: number,
        a: number,
        n: number,
        p1: number,
        q1: number,
        p2: number,
        q2: number,
    ): void
    DrawCurvedB(
        id: number,
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        x3: number,
        y3: number,
        x4: number,
        y4: number,
        z: number,
        a: number,
        n: number,
        p: number,
        q: number,
    ): void
    DrawCurvedT(
        id: number,
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        x3: number,
        y3: number,
        x4: number,
        y4: number,
        z: number,
        a: number,
        n: number,
        p: number,
        q: number,
    ): void
    DrawCurvedBT(
        id: number,
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        x3: number,
        y3: number,
        x4: number,
        y4: number,
        z: number,
        a: number,
        n: number,
        p1: number,
        q1: number,
        p2: number,
        q2: number,
    ): void

    Play(id: number, distance: number): void
    PlayScheduled(id: number, time: number, distance: number): void
    PlayLooped(id: number): number
    PlayLoopedScheduled(id: number, startTime: number): number
    StopLooped(loopId: number): void
    StopLoopedScheduled(loopId: number, endTime: number): void

    Spawn(id: number, ...memory: number[]): void

    SpawnParticleEffect(
        id: number,
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        x3: number,
        y3: number,
        x4: number,
        y4: number,
        duration: number,
        isLooped: boolean,
    ): number
    MoveParticleEffect(
        particleId: number,
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        x3: number,
        y3: number,
        x4: number,
        y4: number,
    ): void
    DestroyParticleEffect(particleId: number): void

    Paint(
        id: number,
        x: number,
        y: number,
        size: number,
        rotation: number,
        z: number,
        a: number,
    ): void

    Print(
        value: number,
        format: number,
        decimalPlaces: number,
        anchorX: number,
        anchorY: number,
        pivotX: number,
        pivotY: number,
        width: number,
        height: number,
        rotation: number,
        color: number,
        alpha: number,
        horizontalAlign: number,
        background: boolean,
    ): void

    HasSkinSprite(id: number): boolean
    HasEffectClip(id: number): boolean
    HasParticleEffect(id: number): boolean

    Judge(
        source: number,
        target: number,
        minPerfect: number,
        maxPerfect: number,
        minGreat: number,
        maxGreat: number,
        minGood: number,
        maxGood: number,
    ): number
    JudgeSimple(
        source: number,
        target: number,
        maxPerfect: number,
        maxGreat: number,
        maxGood: number,
    ): number

    EaseInSine(value: number): number
    EaseOutSine(value: number): number
    EaseInOutSine(value: number): number
    EaseOutInSine(value: number): number
    EaseInQuad(value: number): number
    EaseOutQuad(value: number): number
    EaseInOutQuad(value: number): number
    EaseOutInQuad(value: number): number
    EaseInCubic(value: number): number
    EaseOutCubic(value: number): number
    EaseInOutCubic(value: number): number
    EaseOutInCubic(value: number): number
    EaseInQuart(value: number): number
    EaseOutQuart(value: number): number
    EaseInOutQuart(value: number): number
    EaseOutInQuart(value: number): number
    EaseInQuint(value: number): number
    EaseOutQuint(value: number): number
    EaseInOutQuint(value: number): number
    EaseOutInQuint(value: number): number
    EaseInExpo(value: number): number
    EaseOutExpo(value: number): number
    EaseInOutExpo(value: number): number
    EaseOutInExpo(value: number): number
    EaseInCirc(value: number): number
    EaseOutCirc(value: number): number
    EaseInOutCirc(value: number): number
    EaseOutInCirc(value: number): number
    EaseInBack(value: number): number
    EaseOutBack(value: number): number
    EaseInOutBack(value: number): number
    EaseOutInBack(value: number): number
    EaseInElastic(value: number): number
    EaseOutElastic(value: number): number
    EaseInOutElastic(value: number): number
    EaseOutInElastic(value: number): number

    DebugPause(): void
    DebugLog(value: number): void
}>({
    Add: Infinity,
    Multiply: Infinity,
    Divide: Infinity,
    Rem: Infinity,
    Mod: Infinity,
    Power: Infinity,
    Log: 1,
    Negate: 1,

    Equal: 2,
    NotEqual: 2,
    Greater: 2,
    GreaterOr: 2,
    Less: 2,
    LessOr: 2,

    Not: 1,

    Abs: 1,
    Sign: 1,
    Min: 2,
    Max: 2,

    Ceil: 1,
    Floor: 1,
    Round: 1,
    Frac: 1,
    Trunc: 1,

    Degree: 1,
    Radian: 1,

    Sin: 1,
    Cos: 1,
    Tan: 1,

    Sinh: 1,
    Cosh: 1,
    Tanh: 1,

    Arcsin: 1,
    Arccos: 1,
    Arctan: 1,
    Arctan2: 2,

    Clamp: 3,
    Lerp: 3,
    LerpClamped: 3,
    Unlerp: 3,
    UnlerpClamped: 3,
    Remap: 5,
    RemapClamped: 5,

    Random: 2,
    RandomInteger: 2,

    Get: 2,
    GetShifted: 4,
    GetPointed: 3,

    Set: 3,
    SetAdd: 3,
    SetSubtract: 3,
    SetMultiply: 3,
    SetDivide: 3,
    SetRem: 3,
    SetMod: 3,
    SetPower: 3,
    SetShifted: 5,
    SetAddShifted: 5,
    SetSubtractShifted: 5,
    SetMultiplyShifted: 5,
    SetDivideShifted: 5,
    SetRemShifted: 5,
    SetModShifted: 5,
    SetPowerShifted: 5,
    SetPointed: 4,
    SetAddPointed: 4,
    SetSubtractPointed: 4,
    SetMultiplyPointed: 4,
    SetDividePointed: 4,
    SetRemPointed: 4,
    SetModPointed: 4,
    SetPowerPointed: 4,

    Copy: 5,

    IncrementPre: 2,
    IncrementPreShifted: 4,
    IncrementPrePointed: 3,
    IncrementPost: 2,
    IncrementPostShifted: 4,
    IncrementPostPointed: 3,
    DecrementPre: 2,
    DecrementPreShifted: 4,
    DecrementPrePointed: 3,
    DecrementPost: 2,
    DecrementPostShifted: 4,
    DecrementPostPointed: 3,

    StackInit: 0,
    StackPush: 1,
    StackPop: 0,
    StackGrow: 1,
    StackEnter: 1,
    StackLeave: 0,
    StackGet: 1,
    StackSet: 2,
    StackGetPointer: 0,
    StackSetPointer: 1,
    StackGetFrame: 1,
    StackSetFrame: 2,
    StackGetFramePointer: 0,
    StackSetFramePointer: 1,

    ExportValue: 2,

    BeatToBPM: 1,
    BeatToTime: 1,
    BeatToStartingBeat: 1,
    BeatToStartingTime: 1,

    TimeToTimeScale: 1,
    TimeToScaledTime: 1,
    TimeToStartingTime: 1,
    TimeToStartingScaledTime: 1,

    Draw: 11,
    DrawCurvedL: 14,
    DrawCurvedR: 14,
    DrawCurvedLR: 16,
    DrawCurvedB: 14,
    DrawCurvedT: 14,
    DrawCurvedBT: 16,

    Play: 2,
    PlayScheduled: 3,
    PlayLooped: 1,
    PlayLoopedScheduled: 2,
    StopLooped: 1,
    StopLoopedScheduled: 2,

    Spawn: Infinity,

    SpawnParticleEffect: 11,
    MoveParticleEffect: 9,
    DestroyParticleEffect: 1,

    Paint: 7,

    Print: 14,

    HasSkinSprite: 1,
    HasEffectClip: 1,
    HasParticleEffect: 1,

    Judge: 8,
    JudgeSimple: 5,

    EaseInSine: 1,
    EaseOutSine: 1,
    EaseInOutSine: 1,
    EaseOutInSine: 1,
    EaseInQuad: 1,
    EaseOutQuad: 1,
    EaseInOutQuad: 1,
    EaseOutInQuad: 1,
    EaseInCubic: 1,
    EaseOutCubic: 1,
    EaseInOutCubic: 1,
    EaseOutInCubic: 1,
    EaseInQuart: 1,
    EaseOutQuart: 1,
    EaseInOutQuart: 1,
    EaseOutInQuart: 1,
    EaseInQuint: 1,
    EaseOutQuint: 1,
    EaseInOutQuint: 1,
    EaseOutInQuint: 1,
    EaseInExpo: 1,
    EaseOutExpo: 1,
    EaseInOutExpo: 1,
    EaseOutInExpo: 1,
    EaseInCirc: 1,
    EaseOutCirc: 1,
    EaseInOutCirc: 1,
    EaseOutInCirc: 1,
    EaseInBack: 1,
    EaseOutBack: 1,
    EaseInOutBack: 1,
    EaseOutInBack: 1,
    EaseInElastic: 1,
    EaseOutElastic: 1,
    EaseInOutElastic: 1,
    EaseOutInElastic: 1,

    DebugLog: 1,
    DebugPause: 0,
})
