// Credits to kiwidotzip for base

import Config from "../config";
import { registerWhen } from "../../BloomCore/utils/Utils";
import { pogData } from "./utils/pogdata";

let bloodopen = false
let starttime = 0
var blooddone = false

registerWhen(register("worldLoad", function () {
    bloodopen = false;
    starttime = 0;
    blooddone = false;
}), () => Config().blood);

function getWatcherRating(diftime) {
  if (diftime < 22) return { title: "Fast Watcher", extra: "[FAST]" };
  if (diftime < 25) return { title: "Average Watcher", extra: "[AVERAGE]" };
  return { title: "Slow Watcher", extra: "[SLOW]" };
}

registerWhen(register("chat", (event) => {

  const message = ChatLib.getChatMessage(event);
  const now = Date.now();

  const handlers = [
    {
      key: "[BOSS] The Watcher: Let's see how you can handle this.",
      action: () => {
        const diftime = (now - starttime) / 1000;
        const rating = getWatcherRating(diftime);
        Client.showTitle(`&9&l${rating.title}`, `&9Watcher reached dialogue!`, 2, 45, 10);
        ChatLib.chat(`&c&l[NoNameAddons] &8» &rWatcher took &e${diftime.toFixed(1)}s&r to reach dialogue! &9&l${rating.extra}`);
        ChatLib.command(`pc [NoNameAddons] » Watcher took ${diftime.toFixed(1)}s to reach dialogue! ${rating.extra}`);

      }
    },
    {
      key: "[BOSS] The Watcher: That will be enough for now.",
      action: () => {
        const spawnalltime = ((now - starttime) / 1000).toFixed(1);
        Client.showTitle(`&9!`, `&9Watcher finished spawning mobs!`, 2, 45, 10);
        ChatLib.chat(`&c&l[NoNameAddons] &8» &rWatcher took &e${spawnalltime}s&r to spawn all mobs!`);
        ChatLib.command(`pc [NoNameAddons] » Watcher took ${spawnalltime}s to spawn all mobs!`);

      }
    },
    {
      key: "[BOSS] The Watcher: You have proven yourself. You may pass.",
      condition: () => starttime !== 0,
      action: () => {
        blooddone = true;
        const currentCampTime = (now - starttime) / 1000;
        const camptime = currentCampTime.toFixed(1);
        ChatLib.chat(`&c&l[NoNameAddons] &8» &rBlood camp took &e${camptime}s&r!`);

        if (currentCampTime < pogData.bloodCampPB) {
          pogData.bloodCampPB = currentCampTime;
          pogData.save();
          ChatLib.chat(`&c&l[NoNameAddons] &8» &rNew PB: &e${pogData.bloodCampPB.toFixed(1)}s&r!`);
        }

        ChatLib.command(`pc [NoNameAddons] » Blood camp took ${camptime}s!`);

      }
    },
    {
      key: "[BOSS] The Watcher:",
      condition: () => !bloodopen,
      action: () => {
        bloodopen = true;
        starttime = now;
      }
    }
  ];

  for (const handler of handlers) {
    if (message.startsWith(handler.key)) {
      if (handler.condition && !handler.condition()) continue;
      handler.action();
      break;
    }
  }
}), () => Config().blood);