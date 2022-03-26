import {Center, Space, Text, Title} from "@mantine/core";
import {useProfileContext} from "../../../context/ProfileContextProvider";
import {useAppState} from "../../../pages/_app";

export function InstallationDonePage() {
    const profileContext = useProfileContext()

    const appState = useAppState()

    return (
        <>
            <Space h="xl" />
            <Center style={{marginTop: "50px"}}>
                <Title>Installation completed!</Title>
            </Center>
            <Space h="xl" />
            <Center>
                <Text size="lg">You may now close this page and launch <b>{profileContext.profile?.profileName}</b> from your Minecraft Launcher!</Text>
            </Center>
            {!appState.useAutomaticInstaller && <Explanation />}
        </>
    )
}

function Explanation() {
    return (
        <>

        </>
    )
}