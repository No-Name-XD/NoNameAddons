import { registerWhen } from "../../BloomCore/utils/Utils";
import Config from "../config";

registerWhen(register("chat", (rank, name) => {
    let funPercent = Math.floor(Math.random() * 101); // Generates a random number from 0 to 100
    ChatLib.command(`pc ${name} is ${funPercent}% RACIST!`);
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !racist$/), () => Config().racist);
