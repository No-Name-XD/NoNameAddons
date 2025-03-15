// Credit to UwUAddons For Base
import Config from "../config";
import { registerWhen } from "../../BloomCore/utils/Utils";
import { InDungeon } from "./helperfunction";

const line = "&m-".repeat(ChatLib.getChatWidth() / 6);
let downtimename = "";
let downtimereason = "";


registerWhen(register('chat', (rank, name, alias, reason) => {
    if (!InDungeon()) return;
    if (downtimename == "") {
        downtimename = name
        downtimereason = reason
        ChatLib.command(`pc [NoNameAddons] » ${name} has requested downtime`)
    } else {
        ChatLib.command(`pc [NoNameAddons] » ${downtimename} has already requested downtime`) 
    }
}).setCriteria(/Party > (\[.+\])? ?(.+): !([Dd][Tt]|[Dd][Oo][Ww][Nn][Tt][Ii][Mm][Ee]) ?(.+)?/), () => Config().downtime);


registerWhen(register("chat", (event) => {
    if (downtimename == "") return;
    if (downtimereason == "") downtimereason = "Unspecified";
    Client.scheduleTask(20, () => {
        Client.showTitle("&9Downtime Needed!", "", 0, 60, 0);
        ChatLib.command(`pc [NoNameAddons] » ${downtimename} has requested downtime`);
        ChatLib.chat(`&r&9${line}\n&c&l[NoNameAddons] &8» &a${downtimename} has requested downtime: ${downtimereason}\n&r&9${line}`);
    })
    downtimename = "";
    downtimereason = "";
}).setCriteria(/^\s*> EXTRA STATS <$/), () => Config().downtime);