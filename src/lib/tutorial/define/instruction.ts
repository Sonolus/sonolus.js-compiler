import { defineLib } from '../../shared/define/lib.js'
import { InstructionTextId } from '../ids/InstructionTextId.js'
import { allWritablePointer } from '../utils/pointer.js'

export type InstructionText = {
    readonly name: string
    readonly id: InstructionTextId

    show(): void
}

type InstructionDefinition = {
    texts: Record<string, InstructionText | (string & {})>
}

type InstructionTexts = {
    show(id: InstructionTextId): void
    clear(): void
}

type Instruction<T extends InstructionDefinition> = {
    texts: { readonly name: string; readonly id: number }[] & {
        [K in keyof T['texts']]: InstructionText
    } & InstructionTexts
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
    })
