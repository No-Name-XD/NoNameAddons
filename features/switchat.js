import { registerWhen } from "../../BloomCore/utils/Utils";
import Config from "../config"

registerWhen(register("chat", (message) => {
    const leaveMessages = [
        "You left the party.",
        "You have been removed from the party.",
        "The party was disbanded.",
        "The party was disbanded because all invites expired and the party was empty."
    ];

    if (leaveMessages.includes(message)) {
        ChatLib.command("chat all");
        return;
    }

    const inviteregex = /^(?:\[[^\]]+\] )?.* invited (?:\[[^\]]+\] )?.* to the party! They have 60 seconds to accept.$/;
    const joinRegex = /^You have joined (?:\[[^\]]+\] )?.*'s party!$/;
    if (joinRegex.test(message) || inviteregex.test(message)) {
        ChatLib.command("chat party");
        return;
    }

}).setCriteria("${message}"), () => Config().switchat);
