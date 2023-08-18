import { ParticleEffectName } from 'sonolus-core'
import { convert } from '../containers/Convertible.js'
import { Mat, MatLike } from '../containers/Mat.js'
import { QuadLikeConvertible } from '../containers/Quad.js'
import { ParticleEffectId } from '../ids/ParticleEffectId.js'
import { ParticleEffectInstanceId } from '../instanceIds/ParticleEffectInstanceId.js'
import { native } from '../native.js'
import { defineLib } from './lib.js'

export type ParticleEffect = {
    readonly name: string
    readonly id: ParticleEffectId
    readonly exists: boolean

    spawn(
        quadLike: QuadLikeConvertible,
        duration: number,
        isLooped: boolean,
    ): ParticleEffectInstanceId
}

type ParticleDefinition = {
    effects: Record<string, ParticleEffectName | (string & {})>
}

type ParticleEffects = {
    exists(id: ParticleEffectId): boolean
    spawn(
        id: ParticleEffectId,
        quadLike: QuadLikeConvertible,
        duration: number,
        isLooped: boolean,
    ): ParticleEffectInstanceId
    move(id: ParticleEffectInstanceId, quadLike: QuadLikeConvertible): void
    destroy(id: ParticleEffectInstanceId): void
}

type Particle<T extends ParticleDefinition> = {
    effects: { readonly name: string; readonly id: number }[] & {
        [K in keyof T['effects']]: ParticleEffect
    } & ParticleEffects
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

export const createDefineParticle =
    (pointer: <T>(x: number, y: number, s: number) => T) =>
    <T extends ParticleDefinition>(particle: T): Particle<T> =>
        defineLib<Particle<T>>({
            effects: Object.assign(
                Object.values(particle.effects).map((name, id) => ({ name, id })),
                Object.fromEntries(
                    Object.entries(particle.effects).map(([key, name], id) => [
                        key,
                        defineLib<ParticleEffect>({
                            name: name as never,
                            id: id as never,
                            get exists() {
                                return native.HasParticleEffect(this.id)
                            },

                            spawn(this: ParticleEffect, quadLike, duration, isLooped) {
                                const quad = convert('toQuad', quadLike)

                                return native.SpawnParticleEffect(
                                    this.id,
                                    quad.x1,
                                    quad.y1,
                                    quad.x2,
                                    quad.y2,
                                    quad.x3,
                                    quad.y3,
                                    quad.x4,
                                    quad.y4,
                                    duration,
                                    isLooped,
                                ) as never
                            },
                        }),
                    ]),
                ),
                defineLib<ParticleEffects>({
                    exists(id) {
                        return native.HasParticleEffect(id)
                    },
                    spawn(id, quadLike, duration, isLooped) {
                        const quad = convert('toQuad', quadLike)

                        return native.SpawnParticleEffect(
                            id,
                            quad.x1,
                            quad.y1,
                            quad.x2,
                            quad.y2,
                            quad.x3,
                            quad.y3,
                            quad.x4,
                            quad.y4,
                            duration,
                            isLooped,
                        ) as never
                    },
                    move(id, quadLike) {
                        const quad = convert('toQuad', quadLike)

                        native.MoveParticleEffect(
                            id,
                            quad.x1,
                            quad.y1,
                            quad.x2,
                            quad.y2,
                            quad.x3,
                            quad.y3,
                            quad.x4,
                            quad.y4,
                        )
                    },
                    destroy: native.DestroyParticleEffect,
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
