// Credits to kiwidotzip for base

import Config from "../config";
import { InDungeon } from "./helperfunction";
import { pogData } from "./utils/pogdata";

let bloodopen = false
let starttime = 0
var blooddone = false

register("worldLoad", function () {
    bloodopen = false;
    starttime = 0;
    blooddone = false;
});

function getWatcherRating(diftime) {
  if (diftime < 22) return { title: "Fast Watcher", extra: "[FAST]" };
  if (diftime < 25) return { title: "Average Watcher", extra: "[AVERAGE]" };
  return { title: "Slow Watcher", extra: "[SLOW]" };
}

register("chat", (event) => {
  if (!Config().blood) return;

  const message = ChatLib.getChatMessage(event);
  const now = Date.now();

  const handlers = [
    {
      key: "[BOSS] The Watcher: Let's see how you can handle this.",
      action: () => {
        const diftime = (now - starttime) / 1000;
        const rating = getWatcherRating(diftime);
        Client.showTitle(`&9&l${rating.title}`, `&9Watcher reached dialogue!`, 2, 45, 10);
        ChatLib.chat(`&d[NoNameAddons] &8» &rWatcher took &e${diftime.toFixed(1)}s&r to reach dialogue! &9&l${rating.extra}`);
        if (Config().sendbloodparty) {
          ChatLib.command(`pc [NoNameAddons] » Watcher took ${diftime.toFixed(1)}s to reach dialogue! ${rating.extra}`);
        }
      }
    },
    {
      key: "[BOSS] The Watcher: That will be enough for now.",
      action: () => {
        const spawnalltime = ((now - starttime) / 1000).toFixed(1);
        Client.showTitle(`&9!`, `&9Watcher finished spawning mobs!`, 2, 45, 10);
        ChatLib.chat(`&d[NoNameAddons] &8» &rWatcher took &e${spawnalltime}s&r to spawn all mobs!`);
        if (Config().sendbloodparty) {
          ChatLib.command(`pc [NoNameAddons] » Watcher took ${spawnalltime}s to spawn all mobs!`);
        }
      }
    },
    {
      key: "[BOSS] The Watcher: You have proven yourself. You may pass.",
      condition: () => starttime !== 0,
      action: () => {
        blooddone = true;
        const currentCampTime = (now - starttime) / 1000;
        const camptime = currentCampTime.toFixed(1);
        ChatLib.chat(`&d[NoNameAddons] &8» &rBlood camp took &e${camptime}s&r!`);

        if (currentCampTime < pogData.bloodCampPB) {
          pogData.bloodCampPB = currentCampTime;
          pogData.save();
          ChatLib.chat(`&d[NoNameAddons] &8» &rNew PB: &e${pogData.bloodCampPB.toFixed(1)}s&r!`);
        }

        if (Config().sendbloodparty) {
          ChatLib.command(`pc [NoNameAddons] » Blood camp took ${camptime}s!`);
        }
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
});

//DEBUG WORLD LOAD
register("worldLoad", () => {
  Client.scheduleTask(150, () => {
      if (Config().debug) {
          const indungeondebug = InDungeon();
          ChatLib.chat(`&c&l[NoNameAddons]-DEBUG &8» &rInDungeon: &c${indungeondebug}`);
      }
  });
});