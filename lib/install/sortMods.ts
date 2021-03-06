import {Mod} from "../../types/modProfile";

export function sortMods(mods: Mod[]) {
    const modsSorted = new Map<string, Mod[]>()
    mods.map(value => {
        if (modsSorted.has(value.type.toLowerCase())) {
            modsSorted.get(value.type.toLowerCase())!!.push(value)
        } else {
            modsSorted.set(value.type.toLowerCase(), [value])
        }
    })
    return modsSorted
}
