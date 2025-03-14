// Credits to AzuredBlue for base

import { registerWhen } from "../../BloomCore/utils/Utils";
import Config from "../config";
import { InDungeon } from "./helperfunction";

registerWhen(register('chat', (name, event) => {
    const indungeondebug = InDungeon();
    if (!indungeondebug) return;

    const message = ChatLib.getChatMessage(event)
    if (message.includes('reconnected') || message.includes('Cata Level')) return
    if ((message.includes('You') || message.includes(Player.getName())) && Config().owndeathmessage) return

    let text = Config().deathtext || "BOOM!";
    if (name=="You") name = Player.getName();
    if (text.includes('{name}')) {
        text = text.replace(/{name}/g, name)
    }

    if (text.includes(',')) {
        messagesArray = text.split(',')
        // Randomise message
        text = messagesArray[Math.floor(Math.random() * messagesArray.length)]
    }
    ChatLib.command(`pc ${text}`)


}).setCriteria(/^ ☠ (\S+) .+/), () => Config().deathmessage)


