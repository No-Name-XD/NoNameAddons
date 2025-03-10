// Credits to kiwidotzip for base

// Party commands
import "./features/partycmd";


// Dungeon Commands
// Dungeon Start
import "./features/joincata";
// Blood Helper
import "./features/blood";
// Leap Announce
import "./features/leapannounce";
// Mask Notifiers
import "./features/masknotifiers";
// Terminal Callouts
import "./features/terminalcallouts";
// Terminal Label
import "./features/terminallabel";
// Death Message
import "./features/deathmessage";
// Melody
import "./features/melody";

// Extra //
// Slayer Timer
import "./features/slayertimer";
// Chat Emotes
import "./features/chatemotes";
// TPS
import "./features/tps"
// Racist
import "./features/racist"

let welcome = false

register("worldLoad", () => {
    if(!welcome) {
        ChatLib.chat(`&c&lNoNameAddons &8» &aWelcome back!`);
        welcome = true;
    }
});

register("gameLoad", () => {
    welcome = false;
});

