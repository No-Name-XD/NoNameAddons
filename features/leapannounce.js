// Credits to kiwidotzip for base

import { registerWhen } from "../../BloomCore/utils/Utils";
import Config from "../config";  

registerWhen(register("chat", (player, event) => {
    ChatLib.command(`pc Leaping to ${player}`);
    ChatLib.chat(`"&c&lNoNameAddons &8» &rLeaping to ${player}`);
    cancel(event);
}).setCriteria("You have teleported to ${player}"), () => Config().leapannounce)