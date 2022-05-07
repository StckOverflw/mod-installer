import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {Mod} from "../../../../../types/modProfile";
import {useModEditorContext} from "../../ModEditor";
import {ModDetailsEditor} from "./ModDetailsEditor";
import {Box, Button, Center, Space, Title, useMantineTheme} from "@mantine/core";
import {Plus} from "tabler-icons-react";
import {useListState} from "@mantine/hooks";
import {UseListStateHandler} from "@mantine/hooks/lib/use-list-state/use-list-state";
import {makeId} from "../../../../../lib/makeId";

type ContextProps = {
    mods: Mod[]
    updateMod(mod: Mod, newMod?: Mod): void
}

const ModDetailsContext = React.createContext({} as ContextProps)

export function ModListDetailsEditor() {
    const modEditorContext = useModEditorContext()
    const [mods, modsHandlers] = useListState(modEditorContext.modProfile.mods)

    const [newMod, setNewMod] = useState<Mod>()

    const theme = useMantineTheme()

    function updateMod(mod: Mod, newMod?: Mod) {
        if (newMod) {
            modsHandlers.applyWhere((m) => m === mod, () => newMod)
        } else {
            modsHandlers.remove(mods.indexOf(mod))
        }
    }

    useEffect(() => {
        modEditorContext.modProfile.mods = mods
    }, [modEditorContext.modProfile, mods])

    return (
        <ModDetailsContext.Provider value={{mods, updateMod}}>
            <Box style={{backgroundColor: theme.colors.dark[8], padding: "2%", borderRadius: "2vmin"}}>
                <Center style={{marginTop: "3%"}}>
                    <Title order={3}>Mods</Title>
                </Center>
                <Space h="md"/>
                {getEditors(mods, newMod, modsHandlers, setNewMod)}
            </Box>
        </ModDetailsContext.Provider>
    )
}

export function useModDetailsContext() {
    return useContext(ModDetailsContext)
}

function getEditors(mods: Mod[], newMod: Mod | undefined, modsHandlers: UseListStateHandler<Mod>, setNewMod: Dispatch<SetStateAction<Mod | undefined>>) {
    const elements: React.ReactNode[] = []

    elements.push(
        mods.map((value, index) =>
            <div key={makeId(12)}>
                <ModDetailsEditor mod={value} openPopUp={value === newMod} key={index}/>
                <Space h="md"/>
            </div>
        )
    )


    elements.push(
        <div key={"add mod"}>
            <Center>
                <Button
                    variant="light"
                    onClick={() => {
                        const newMod = {
                            name: "Untitled Mod",
                            type: "untitled",
                            required: false,
                            defaultActivated: false
                        } as Mod
                        modsHandlers.append(newMod)
                        setNewMod(newMod)
                    }}
                >
                    <Plus/>
                </Button>
            </Center>
            <Space h="md"/>
        </div>
    )


    return elements
}
