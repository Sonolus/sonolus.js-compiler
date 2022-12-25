export const searchPrototype = (thisValue: unknown, property: unknown): unknown => {
    let prototype = thisValue
    while (prototype) {
        if (
            Object.values(Object.getOwnPropertyDescriptors(prototype))
                .map((descriptor) => descriptor.value)
                .includes(property)
        )
            return prototype

        prototype = Object.getPrototypeOf(prototype)
    }

    return prototype
}
