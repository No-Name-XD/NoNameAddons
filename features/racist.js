import Config from "../config";

register("chat", (rank, name) => {
    if (!Config().racist) return
    let funPercent = Math.floor(Math.random() * 101); // Generates a random number from 0 to 100
    ChatLib.command(`pc ${name} is ${funPercent}% RACIST!`);
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !racist$/);
