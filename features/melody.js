// Credits to AzuredBlue for base

import Config from "../config"
import { pogData } from "./utils/pogdata";

function isInP3() {
    return pogData.goldorsection > 0 && pogData.goldorsection < 5;
}

register('guiOpened', () => {
    if (!isInP3()) return

    text = Config().melodytext || "MELODY!";

    Client.scheduleTask(2, () => {
        if (Player?.getContainer()?.getName() != 'Click the button on time!') return
        claySlots = new Map([
            [25, `pc ${text} 1/4`],
            [34, `pc ${text} 2/4`],
            [43, `pc ${text} 3/4`]
        ])
        if (!Config().announcemelody) return
        ChatLib.command(`pc ${text}`)
    })
})

text = Config().melodytext || "MELODY!";

let claySlots = new Map([
    [25, `pc ${text} 1/4`],
    [34, `pc ${text} 2/4`],
    [43, `pc ${text} 3/4`]
])

register('step', () => {
    if (!isInP3() || Player?.getContainer()?.getName() != 'Click the button on time!' || !Config().progressmelody) return

    let greenClays = Array.from(claySlots.keys()).filter(index => Player?.getContainer()?.getItems()[index]?.getMetadata() == 5)
    if (!greenClays.length) return
    
    ChatLib.command(claySlots.get(greenClays[greenClays.length - 1]))
    greenClays.forEach(clay => claySlots.delete(clay))
    greenClays = []
}).setFps(5)