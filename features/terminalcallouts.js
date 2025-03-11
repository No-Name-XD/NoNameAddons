// Credits to kiwidotzip for base

import { registerWhen } from "../../BloomCore/utils/Utils";
import Config from "../config";

registerWhen(register("chat", () => {
    let term = parseInt(Config().sendTermInChat);
    let message = term === 5 ? "I will do devices!" : `I will do Terminal no: ${term}!`;
    ChatLib.command(`pc ${message}`);
}).setCriteria("[BOSS] Storm: I should have known that I stood no chance."), () => Config().sendTermInChat != 0);