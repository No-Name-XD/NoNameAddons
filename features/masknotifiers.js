// Credits to kiwidotzip for base
import Config from "../config";

function showtile(text, duration) {
    for (let i = duration; i > 0; i--) {
        Client.scheduleTask((duration - i) * 20, ((current) => () => { 
            Client.showTitle(`&b${text} POPPED!!`, `&9[ ${current}s ]`, 0, 20, 10); 
        })(i));
    }
}

register("chat", (event) => {
    if (!Config().masknotifier) return
    cancel(event)
    showtile(`Bonzo`, 3);
    ChatLib.command(`pc NoNameAddons » Bonzo Mask POPPED (3s)`)
}).setCriteria("Your ⚚ Bonzo's Mask saved your life!")

register("chat", (event) => {
    if (!Config().masknotifier) return
    cancel(event)
    showtile(`Bonzo`, 3);
    ChatLib.command(`pc NoNameAddons » Bonzo Mask POPPED (3s)`)
}).setCriteria("Your Bonzo's Mask saved your life!")

register("chat", (event) => {
    if (!Config().masknotifier) return
    cancel(event)
    showtile(`Spirit Mask`, 3);
    ChatLib.command(`pc NoNameAddons » Spirit Mask POPPED (3s)`)
}).setCriteria("Second Wind Activated! Your Spirit Mask saved your life!")

register("chat", (event) => {
    if (!Config().masknotifier) return
    cancel(event)
    showtile(`Phoenix`, 4);
    ChatLib.command(`pc NoNameAddons » Phoenix Pet POPPED (2-4s)`)
}).setCriteria("Your Phoenix Pet saved you from certain death!")