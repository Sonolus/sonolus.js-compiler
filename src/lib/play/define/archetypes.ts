import { Archetype } from '../Archetype.js'

export type Archetypes<
    T extends Record<string, typeof Archetype> = Record<string, typeof Archetype>,
> = {
    [K in keyof T]: InstanceType<T[K]>
}

export const defineArchetypes = <T extends Record<string, typeof Archetype>>(
    archetypes: T,
): Archetypes<T> =>
    Object.fromEntries(
        Object.entries(archetypes).map(([name, Archetype], index) => {
            const archetype = new Archetype()
            archetype.name = name
            archetype.index = index

            return [name, archetype]
        }),
    ) as never
