// Credits to kiwidotzip for base

//---- DUNGEONS ---//
import "./features/masknotifiers";    // Mask Pop Notification
import "./features/blood";            // Blood Helper Main
import "./features/deathmessage";     // Death Message
import "./features/leapannounce";     // Leap Announcement
import "./features/melody";           // Announce Melody
import "./features/terminallabel";    // Label Terminal
import "./features/terminalcallouts"; // Terminal Callouts


//---- CHAT COMMANDS ---//
import "./features/joincata";         // Join Dungeon
import "./features/downtime";         // Downtime Message
import "./features/switchat";         // Switch Chat
import "./features/partycmd";         // Party commands Main


//---- EXTRA COMMANDS ---//
import "./features/slayertimer";      // Slayer Kill Time
import "./features/chatemotes";       // Chat Emotes
import "./features/stats";              // TPS
import "./features/racist";           // Racist

import request from "../requestV2"

const VERSION = JSON.parse(FileLib.read("NoNameAddons", "metadata.json")).version;
const API_URL = 'https://api.github.com/repos/No-Name-XD/NoNameAddons/releases';

function checkUpdate() {
    request({
        url: API_URL,
        headers: { 'User-Agent': 'NoNameAddons' },
        json: true
    })
    .then(function(response) {
        if (!response.length) {
            ChatLib.chat('&c&l[NoNameAddons] &8» &cNo releases found!');
            return;
        }

        ChatLib.chat(`&c&l[NoNameAddons] &8» &aWelcome back! Checking for updates...`);
        const latest = response[0];
        const remoteVersion = latest.tag_name.replace(/^v/, '');
        const localVersion = VERSION.replace(/^v/, '');

        if (localVersion > remoteVersion) {
            ChatLib.chat('&c&l[NoNameAddons] &8» &aYou\'re running a development build that is newer than the latest release!');
        } else if (localVersion < remoteVersion) {
            ChatLib.chat(`&c&l[NoNameAddons] &8» &aUpdate available: &bv${remoteVersion}&a! Current: &ev${localVersion}`);
            ChatLib.chat(new TextComponent(`&c&l[NoNameAddons] &8» &aClick here to go to the Github release page!`)
            .setClick("open_url", `https://github.com/No-Name-XD/NoNameAddons/releases/latest`));
        } else {
            ChatLib.chat('&c&l[NoNameAddons] &8» &aYou\'re running the latest version!');
        }
    })
    .catch(function(error) {
        ChatLib.chat(`&c&l[NoNameAddons] &8» &cUpdate check failed: ${error}`);
    });
}

let updateChecked = false;

register("worldLoad", () => {
    if(!updateChecked) {
        updateChecked = true
        checkUpdate();
    }
});
