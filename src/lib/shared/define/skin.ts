import { SkinSpriteName } from 'sonolus-core'
import { convert } from '../../shared/containers/Convertible.js'
import { Mat, MatLike } from '../../shared/containers/Mat.js'
import { QuadLikeConvertible } from '../../shared/containers/Quad.js'
import { VecLike } from '../../shared/containers/Vec.js'
import { defineLib } from '../../shared/define/lib.js'
import { SkinSpriteId } from '../../shared/ids/SkinSpriteId.js'
import { native } from '../../shared/native.js'

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

export const createDefineSkin =
    (pointer: <T>(x: number, y: number, s: number) => T) =>
    <T extends SkinDefinition>(skin: T): Skin<T> =>
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
                m00: pointer(0, 0, 0),
                m01: pointer(1, 0, 0),
                m02: pointer(2, 0, 0),
                m03: pointer(3, 0, 0),
                m10: pointer(4, 0, 0),
                m11: pointer(5, 0, 0),
                m12: pointer(6, 0, 0),
                m13: pointer(7, 0, 0),
                m20: pointer(8, 0, 0),
                m21: pointer(9, 0, 0),
                m22: pointer(10, 0, 0),
                m23: pointer(11, 0, 0),
                m30: pointer(12, 0, 0),
                m31: pointer(13, 0, 0),
                m32: pointer(14, 0, 0),
                m33: pointer(15, 0, 0),
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
