import { Container } from './Container.js'

export type MatLike = {
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
}

export class Mat extends Container<Mat>(
    'm00',
    'm01',
    'm02',
    'm03',
    'm10',
    'm11',
    'm12',
    'm13',
    'm20',
    'm21',
    'm22',
    'm23',
    'm30',
    'm31',
    'm32',
    'm33',
) {
    m00 = 0
    m01 = 0
    m02 = 0
    m03 = 0
    m10 = 0
    m11 = 0
    m12 = 0
    m13 = 0
    m20 = 0
    m21 = 0
    m22 = 0
    m23 = 0
    m30 = 0
    m31 = 0
    m32 = 0
    m33 = 0

    constructor(
        ...args:
            | []
            | [mat: MatLike]
            | [
                  m00: number,
                  m01: number,
                  m02: number,
                  m03: number,
                  m10: number,
                  m11: number,
                  m12: number,
                  m13: number,
                  m20: number,
                  m21: number,
                  m22: number,
                  m23: number,
                  m30: number,
                  m31: number,
                  m32: number,
                  m33: number,
              ]
    ) {
        super()

        if (args.length === 16) {
            ;[
                this.m00,
                this.m01,
                this.m02,
                this.m03,
                this.m10,
                this.m11,
                this.m12,
                this.m13,
                this.m20,
                this.m21,
                this.m22,
                this.m23,
                this.m30,
                this.m31,
                this.m32,
                this.m33,
            ] = args
        } else if (args.length === 1) {
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
            } = args[0])
        }
    }

    mul(mat: MatLike): Mat {
        return new Mat(
            this.m00 * mat.m00 + this.m01 * mat.m10 + this.m02 * mat.m20 + this.m03 * mat.m30,
            this.m00 * mat.m01 + this.m01 * mat.m11 + this.m02 * mat.m21 + this.m03 * mat.m31,
            this.m00 * mat.m02 + this.m01 * mat.m12 + this.m02 * mat.m22 + this.m03 * mat.m32,
            this.m00 * mat.m03 + this.m01 * mat.m13 + this.m02 * mat.m23 + this.m03 * mat.m33,
            this.m10 * mat.m00 + this.m11 * mat.m10 + this.m12 * mat.m20 + this.m13 * mat.m30,
            this.m10 * mat.m01 + this.m11 * mat.m11 + this.m12 * mat.m21 + this.m13 * mat.m31,
            this.m10 * mat.m02 + this.m11 * mat.m12 + this.m12 * mat.m22 + this.m13 * mat.m32,
            this.m10 * mat.m03 + this.m11 * mat.m13 + this.m12 * mat.m23 + this.m13 * mat.m33,
            this.m20 * mat.m00 + this.m21 * mat.m10 + this.m22 * mat.m20 + this.m23 * mat.m30,
            this.m20 * mat.m01 + this.m21 * mat.m11 + this.m22 * mat.m21 + this.m23 * mat.m31,
            this.m20 * mat.m02 + this.m21 * mat.m12 + this.m22 * mat.m22 + this.m23 * mat.m32,
            this.m20 * mat.m03 + this.m21 * mat.m13 + this.m22 * mat.m23 + this.m23 * mat.m33,
            this.m30 * mat.m00 + this.m31 * mat.m10 + this.m32 * mat.m20 + this.m33 * mat.m30,
            this.m30 * mat.m01 + this.m31 * mat.m11 + this.m32 * mat.m21 + this.m33 * mat.m31,
            this.m30 * mat.m02 + this.m31 * mat.m12 + this.m32 * mat.m22 + this.m33 * mat.m32,
            this.m30 * mat.m03 + this.m31 * mat.m13 + this.m32 * mat.m23 + this.m33 * mat.m33,
        )
    }

    translate(x: number, y: number): Mat {
        return Mat.translation(x, y).mul(this)
    }

    scale(x: number, y: number): Mat {
        return Mat.scaling(x, y).mul(this)
    }

    rotate(angle: number): Mat {
        return Mat.rotation(angle).mul(this)
    }

    static get identity(): Mat {
        return new Mat(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
    }

    static translation(x: number, y: number): Mat {
        return new Mat(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, 0, 0, 0, 0, 1)
    }

    static scaling(x: number, y: number): Mat {
        return new Mat(x, 0, 0, 0, 0, y, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
    }

    static rotation(angle: number): Mat {
        return new Mat(
            Math.cos(angle),
            -Math.sin(angle),
            0,
            0,
            Math.sin(angle),
            Math.cos(angle),
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1,
        )
    }
}
