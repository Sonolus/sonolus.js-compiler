import { SkinSpriteName } from 'sonolus-core'
import { convert } from '../containers/Convertible.js'
import { Mat, MatLike } from '../containers/Mat.js'
import { QuadLikeConvertible } from '../containers/Quad.js'
import { VecLike } from '../containers/Vec.js'
import { native } from '../native.js'
import { SkinSpriteId } from '../types/ids.js'
import { singleThreadedWritablePointer } from '../utils/pointer.js'
import { defineLib } from './lib.js'

export type SkinSprite = {
    readonly name: string
    readonly id: SkinSpriteId
    readonly exists: boolean

    draw(quadLike: QuadLikeConvertible, z: number, a: number): void
    draw(
        quadLike: QuadLikeConvertible,
        z: number,
        a: number,
        curvedEdges: 'l' | 'r' | 'b' | 't',
        n: number,
        cp: VecLike,
    ): void
    draw(
        quadLike: QuadLikeConvertible,
        z: number,
        a: number,
        curvedEdges: 'lr' | 'bt',
        n: number,
        cp1: VecLike,
        cp2: VecLike,
    ): void
}

type SkinDefinition = {
    sprites: Record<string, SkinSpriteName | (string & {})>
}

type SkinSprites = {
    exists(id: SkinSpriteId): boolean
    draw(id: SkinSpriteId, quadLike: QuadLikeConvertible, z: number, a: number): void
    draw(
        id: SkinSpriteId,
        quadLike: QuadLikeConvertible,
        z: number,
        a: number,
        curvedEdges: 'l' | 'r' | 'b' | 't',
        n: number,
        cp: VecLike,
    ): void
    draw(
        id: SkinSpriteId,
        quadLike: QuadLikeConvertible,
        z: number,
        a: number,
        curvedEdges: 'lr' | 'bt',
        n: number,
        cp1: VecLike,
        cp2: VecLike,
    ): void
}

type Skin<T extends SkinDefinition> = {
    sprites: { readonly name: string; readonly id: number }[] & {
        [K in keyof T['sprites']]: SkinSprite
    } & SkinSprites
    transform: {
        m00: number
        m01: number
        m02: number
        m03: number
        m10: number
        m11: number
        m12: number
        m13: number
        m20: number
        m21: number
        m22: number
        m23: number
        m30: number
        m31: number
        m32: number
        m33: number
        readonly mat: Mat

        set(mat: MatLike): void
    }
}

export const defineSkin = <T extends SkinDefinition>(skin: T): Skin<T> =>
    defineLib<Skin<T>>({
        sprites: Object.assign(
            Object.values(skin.sprites).map((name, id) => ({ name, id })),
            Object.fromEntries(
                Object.entries(skin.sprites).map(([key, name], id) => [
                    key,
                    defineLib<SkinSprite>({
                        name: name as never,
                        id: id as never,
                        get exists() {
                            return native.HasSkinSprite(this.id)
                        },

                        draw(this: SkinSprite, quadLike, z, a, curvedEdges?, n?, cp1?, cp2?) {
                            const quad = convert('toQuad', quadLike)

                            const baseArgs = [
                                this.id,
                                quad.x1,
                                quad.y1,
                                quad.x2,
                                quad.y2,
                                quad.x3,
                                quad.y3,
                                quad.x4,
                                quad.y4,
                                z,
                                a,
                            ] as const

                            const oneEdgeArgs = () =>
                                [n as number, (cp1 as VecLike).x, (cp1 as VecLike).y] as const

                            const twoEdgesArgs = () =>
                                [
                                    n as number,
                                    (cp1 as VecLike).x,
                                    (cp1 as VecLike).y,
                                    (cp2 as VecLike).x,
                                    (cp2 as VecLike).y,
                                ] as const

                            if (curvedEdges === 'l') {
                                native.DrawCurvedL(...baseArgs, ...oneEdgeArgs())
                            } else if (curvedEdges === 'r') {
                                native.DrawCurvedR(...baseArgs, ...oneEdgeArgs())
                            } else if (curvedEdges === 'b') {
                                native.DrawCurvedB(...baseArgs, ...oneEdgeArgs())
                            } else if (curvedEdges === 't') {
                                native.DrawCurvedT(...baseArgs, ...oneEdgeArgs())
                            } else if (curvedEdges === 'lr') {
                                native.DrawCurvedLR(...baseArgs, ...twoEdgesArgs())
                            } else if (curvedEdges === 'bt') {
                                native.DrawCurvedBT(...baseArgs, ...twoEdgesArgs())
                            } else {
                                native.Draw(...baseArgs)
                            }
                        },
                    }),
                ]),
            ),
            defineLib<SkinSprites>({
                exists(id) {
                    return native.HasSkinSprite(id)
                },
                draw(id, quadLike, z, a, curvedEdges?, n?, cp1?, cp2?) {
                    const quad = convert('toQuad', quadLike)

                    const baseArgs = [
                        id,
                        quad.x1,
                        quad.y1,
                        quad.x2,
                        quad.y2,
                        quad.x3,
                        quad.y3,
                        quad.x4,
                        quad.y4,
                        z,
                        a,
                    ] as const

                    const oneEdgeArgs = () =>
                        [n as number, (cp1 as VecLike).x, (cp1 as VecLike).y] as const

                    const twoEdgesArgs = () =>
                        [
                            n as number,
                            (cp1 as VecLike).x,
                            (cp1 as VecLike).y,
                            (cp2 as VecLike).x,
                            (cp2 as VecLike).y,
                        ] as const

                    if (curvedEdges === 'l') {
                        native.DrawCurvedL(...baseArgs, ...oneEdgeArgs())
                    } else if (curvedEdges === 'r') {
                        native.DrawCurvedR(...baseArgs, ...oneEdgeArgs())
                    } else if (curvedEdges === 'b') {
                        native.DrawCurvedB(...baseArgs, ...oneEdgeArgs())
                    } else if (curvedEdges === 't') {
                        native.DrawCurvedT(...baseArgs, ...oneEdgeArgs())
                    } else if (curvedEdges === 'lr') {
                        native.DrawCurvedLR(...baseArgs, ...twoEdgesArgs())
                    } else if (curvedEdges === 'bt') {
                        native.DrawCurvedBT(...baseArgs, ...twoEdgesArgs())
                    } else {
                        native.Draw(...baseArgs)
                    }
                },
            }),
        ) as never,
        transform: {
            m00: singleThreadedWritablePointer(1003, 0, 0, 0),
            m01: singleThreadedWritablePointer(1003, 1, 0, 0),
            m02: singleThreadedWritablePointer(1003, 2, 0, 0),
            m03: singleThreadedWritablePointer(1003, 3, 0, 0),
            m10: singleThreadedWritablePointer(1003, 4, 0, 0),
            m11: singleThreadedWritablePointer(1003, 5, 0, 0),
            m12: singleThreadedWritablePointer(1003, 6, 0, 0),
            m13: singleThreadedWritablePointer(1003, 7, 0, 0),
            m20: singleThreadedWritablePointer(1003, 8, 0, 0),
            m21: singleThreadedWritablePointer(1003, 9, 0, 0),
            m22: singleThreadedWritablePointer(1003, 10, 0, 0),
            m23: singleThreadedWritablePointer(1003, 11, 0, 0),
            m30: singleThreadedWritablePointer(1003, 12, 0, 0),
            m31: singleThreadedWritablePointer(1003, 13, 0, 0),
            m32: singleThreadedWritablePointer(1003, 14, 0, 0),
            m33: singleThreadedWritablePointer(1003, 15, 0, 0),
            get mat() {
                return new Mat(this as never)
            },

            set(mat: MatLike) {
                ;({
                    m00: this.m00,
                    m01: this.m01,
                    m02: this.m02,
                    m03: this.m03,
                    m10: this.m10,
                    m11: this.m11,
                    m12: this.m12,
                    m13: this.m13,
                    m20: this.m20,
                    m21: this.m21,
                    m22: this.m22,
                    m23: this.m23,
                    m30: this.m30,
                    m31: this.m31,
                    m32: this.m32,
                    m33: this.m33,
                } = mat)
            },
        },
    })
