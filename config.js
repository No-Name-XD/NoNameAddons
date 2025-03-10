// Credits to kiwidotzip for base
// Make sure these go to the right directory 
import Settings from "../Amaterasu/core/Settings"
import DefaultConfig from "../Amaterasu/core/DefaultConfig"
const defaultConf = new DefaultConfig("NoNameAddons", "data/settings.json")

// Dungeons //

// Join Dungeon
.addSwitch({
    category: "Dungeons",
    configName: "joincata",
    title: "Join Dungeon Floor",
    description: "Starts a catacombs floor when someone types !f? or !m?",
    subcategory: "Join Dungeon"
})

// Mask Pop Notification
.addSwitch({
    category: "Dungeons",
    configName: "masknotifier",
    title: "Mask Notifications",
    description: "Notifies party chat when a mask pops",
    subcategory: "Mask notifications"
})

// Blood Helper Main
.addSwitch({
    category: "Dungeons",
    configName: "blood",
    title: "Blood Helper",
    description: "Enable blood helper",
    subcategory: "Blood helper"
})

// Send Blood times
.addSwitch({
    category: "Dungeons",
    configName: "sendbloodparty",
    title: "Send blood information",
    description: "Sends blood times to party chat",
    subcategory: "Blood helper",
    shouldShow: data => data.blood
})

// Death Message
.addSwitch({
    category: "Dungeons",
    configName: "deathmessage",
    title: "Death Message",
    description: "Send message in chat if someone dies ",
    subcategory: "Death Message"
})

.addTextInput({
    category: "Dungeons",
    configName: "deathtext",
    title: "Death Text",
    description: "Use \",\" to add more message. (Use {name} for dead player)",
    subcategory: "Death Message",
    placeHolder: "BOOM!",
    shouldShow: data => data.deathmessage
})

.addSwitch({
    category: "Dungeons",
    configName: "owndeathmessage",
    title: "Exclude Own Death",
    description: "Ignores own death message",
    subcategory: "Death Message",
    shouldShow: data => data.deathmessage
})

// Leap Announcement
.addSwitch({
    category: "Dungeons",
    configName: "leapannounce",
    title: "Leap Announce",
    description: "Sends a message in party chat when you leap to a player",
    subcategory: "Leap announce"
})

// Announce Melody
.addSwitch({
    category: "Dungeons",
    configName: "announcemelody",
    title: "Announce Melody",
    description: "Sends a message in party chat to let them know you got melody",
    subcategory: "Melody"
})

.addTextInput({
    category: "Dungeons",
    configName: "melodytext",
    title: "Melody Text",
    description: "Will be used in melody progress also",
    subcategory: "Melody",
    placeHolder: "MELODY!",
    shouldShow: data => data.announcemelody
})

// Announce Melody Progression
.addSwitch({
    category: "Dungeons",
    configName: "progressmelody",
    title: "Announce Melody Progress",
    description: "Sends melody progress in party chat",
    subcategory: "Melody",
    shouldShow: data => data.announcemelody
})

// Label Terminal
.addDropDown({
    category: "Dungeons",
    configName: "showTerm",
    title: "Terminal labels",
    description: "Select the terminal number that you want!",
    subcategory: "Terminals",
    options: ['None', '1', '2', '3', '4', 'Device', 'All'],
    value: 0
})


// Box Terminal
.addSwitch({
    category: "Dungeons",
    configName: "boxTerm",
    title: "Box terminal",
    description: "Boxes the terminal",
    subcategory: "Terminals",
    shouldShow: data => data.showTerm != 0
})

// Terminal In Chat
.addDropDown({
    category: "Dungeons",
    configName: "sendTermInChat",
    title: "Send the terminal you select in chat",
    description: "Sends the terminal you select in chat",
    subcategory: "Terminals",
    options: ['None', '1', '2', '3', '4', 'Device'],
    value: 0
})


// Party commands //

// Party commands Main
.addSwitch({
    category: "Party Commands",
    configName: "partycommands",
    title: "Party Commands",
    description: "Enables party commands",
    subcategory: "Party Commands"
})

// Party Transfer
.addSwitch({
    category: "Party Commands",
    configName: "partytransfer",
    title: "Party Transfer",
    description: "Transfers the party to the player that ran !ptme",
    subcategory: "Party Commands",
    shouldShow: data => data.partycommands,
})

//  Party Warp
.addSwitch({
    category: "Party Commands",
    configName: "partywarp",
    title: "Party Warp",
    description: "Warps the party when someone says !warp",
    subcategory: "Party Commands",
    shouldShow: data => data.partycommands,
})

// Party Invite
.addSwitch({
    category: "Party Commands",
    configName: "partyinvite",
    title: "Party Invite",
    description: "Runs the party invite command when someone says !inv, !invite, !party, !p username in chat",
    subcategory: "Party Commands",
    shouldShow: data => data.partycommands,
})

// All Invites
.addSwitch({
    category: "Party Commands",
    configName: "partyallinvite",
    title: "AllInvite",
    description: "Toggles allinvite when someone says !allinv or !allinvite",
    subcategory: "Party Commands",
    shouldShow: data => data.partycommands,
})

// Kick Offline
.addSwitch({
    category: "Party Commands",
    configName: "partykickoffline",
    title: "KickOffline",
    description: "Kicks all offline players from the party when someone says !kickoffline",
    subcategory: "Party Commands",
    shouldShow: data => data.partycommands,
})


// Extra //

// Slayer Kill Time
.addSwitch({
    category: "Extra",
    configName: "slayerkilltimer",
    title: "Slayer kill timer",
    description: "Shows the boss kill time in chat",
    subcategory: "misc"
})

// Chat Emotes
.addSwitch({
    category: "Extra",
    configName: "chatemotes",
    title: "Chat Emotes",
    description: "Use the same chat emotes as MVP++",
    subcategory: "misc"
})

// Tps
.addSwitch({
    category: "Extra",
    configName: "tps",
    title: "TPS",
    description: "Send tps in chat when you type !tps",
    subcategory: "misc"
})

// Racist
.addSwitch({
    category: "Extra",
    configName: "racist",
    title: "Racist",
    description: "Type !racist to find out",
    subcategory: "misc"
})


// Dev //

.addButton({
    category: "Developer",
    configName: "credit1",
    title: "LuckIssuing",
    description: "Developer",
    subcategory: "Developer",
    onClick() {
        ChatLib.chat(`&d&lStay Lucky!!`)
    }
})

// .addSwitch({
//     category: "Developer",
//     configName: "debug",
//     title: "Debug",
//     description: "Enables debug messages",
//     subcategory: "Debug"
// })

const config = new Settings("NoNameAddons", defaultConf, "data/ColorScheme.json").setCommand("NoNameAddons", ["nna", "luck"])
config
      .setSize(60, 60)
      .apply()
export default () => config.settings
