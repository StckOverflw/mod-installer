import JSZip from "jszip";
import {Mod} from "../../../types/modProfile";
import {ModInstallState} from "../ModInstallState";

export async function installToModZip(mod: Mod, zip: JSZip): Promise<ModInstallState> {
    const response = await fetch(mod.downloadLink, {mode: "cors"})
    if (response.status === 200) {
        const data = await response.arrayBuffer()
        zip.file(mod.path, data)
        return ModInstallState.DONE
    } else {
        throw new Error(`Failed to download ${mod.name} (Got ${response.status})`)
    }
}
