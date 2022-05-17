import {Dispatch, SetStateAction} from "react";
import {Mod, ModProfile} from "../../types/modProfile";
import {ModInstallState} from "./ModInstallState";

export async function installMod(dir: FileSystemDirectoryHandle, profile: ModProfile, mod: Mod, setError: Dispatch<SetStateAction<string | undefined>>): Promise<ModInstallState> {
    const modsDir = await dir.getDirectoryHandle("mods", {create: true})

    const response = await fetch(mod.downloadLink, {mode: "cors"})

    if (response.status === 200) {
        const split = mod.downloadLink.split("/")
        const handle = await modsDir.getFileHandle(split[split.length - 1], {create: true})
        // @ts-ignore
        const writableStream = await handle.createWritable()
        await response.body!!.pipeTo(writableStream)
        return ModInstallState.DONE
    } else {
        setError(`There was an error requesting, got ${response.status} status-code`)
        return ModInstallState.FAILED
    }
}
