import { InstructionIconName } from 'sonolus-core'
import { VecLike } from '../../shared/containers/Vec.js'
import { defineLib } from '../../shared/define/lib.js'
import { native } from '../../shared/native.js'
import { InstructionIconId } from '../ids/InstructionIconId.js'
import { InstructionTextId } from '../ids/InstructionTextId.js'
import { allWritablePointer } from '../utils/pointer.js'

export type InstructionText = {
    readonly name: string
    readonly id: InstructionTextId

    show(): void
}

export type InstructionIcon = {
    readonly name: string
    readonly id: InstructionIconId

    paint(position: VecLike, size: number, rotation: number, z: number, a: number): void
}

type InstructionDefinition = {
    texts: Record<string, InstructionText | (string & {})>
    icons: Record<string, InstructionIconName | (string & {})>
}

type InstructionTexts = {
    show(id: InstructionTextId): void
    clear(): void
}

type InstructionIcons = {
    paint(
        id: InstructionIconId,
        position: VecLike,
        size: number,
        rotation: number,
        z: number,
        a: number,
    ): void
}

type Instruction<T extends InstructionDefinition> = {
    texts: { readonly name: string; readonly id: number }[] & {
        [K in keyof T['texts']]: InstructionText
    } & InstructionTexts
    icons: { readonly name: string; readonly id: number }[] & {
        [K in keyof T['icons']]: InstructionIcon
    } & InstructionIcons
}

type WithInstruction<T> = T & {
    instruction: number
}

export const defineInstruction = <T extends InstructionDefinition>(
    instruction: T,
): Instruction<T> =>
    defineLib<Instruction<T>>({
        texts: Object.assign(
            Object.values(instruction.texts).map((name, id) => ({ name, id })),
            Object.fromEntries(
                Object.entries(instruction.texts).map(([key, name], id) => [
                    key,
                    defineLib<WithInstruction<InstructionText>>({
                        name: name as never,
                        id: id as never,

                        instruction: allWritablePointer(2002, 0, 0, 0),

                        show(this: WithInstruction<InstructionText>) {
                            this.instruction = this.id
                        },
                    }),
                ]),
            ),
            defineLib<WithInstruction<InstructionTexts>>({
                instruction: allWritablePointer(2002, 0, 0, 0),

                show(this: WithInstruction<InstructionText>, id) {
                    this.instruction = id
                },
                clear(this: WithInstruction<InstructionText>) {
                    this.instruction = -1
                },
            }),
        ) as never,
        icons: Object.assign(
            Object.values(instruction.icons).map((name, id) => ({ name, id })),
            Object.fromEntries(
                Object.entries(instruction.icons).map(([key, name], id) => [
                    key,
                    defineLib<InstructionIcon>({
                        name: name as never,
                        id: id as never,

                        paint(this: InstructionIcon, position, size, rotation, z, a) {
                            native.Paint(this.id, position.x, position.y, size, rotation, z, a)
                        },
                    }),
                ]),
            ),
            defineLib<InstructionIcons>({
                paint(id, position, size, rotation, z, a) {
                    native.Paint(id, position.x, position.y, size, rotation, z, a)
                },
            }),
        ) as never,
    })
