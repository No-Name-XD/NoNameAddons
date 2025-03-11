// Credits to kiwidotzip for base

import Config from "../config";
import Party from "../../BloomCore/Party"
import { registerWhen } from "../../BloomCore/utils/Utils";

registerWhen(register('chat', (rank, name) => {
    if (name === Player.getName()) return;
	if (!Config().partycommands) return;
	if (Party.leader == Player.getName()) {
		ChatLib.command(`party transfer ${name}`)
	}
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?([\w\S ]{1,16}): !ptme$/), () => Config().partytransfer);

registerWhen(register('chat', (rank, name) => {
	if (!Config().partycommands) return;
	if (Party.leader == Player.getName()) {
		ChatLib.command(`party warp`)
	}
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?([\w\S ]{1,16}): !warp$/), () => Config().partywarp);

registerWhen(register('chat', (rank, name) => {
	if (!Config().partycommands) return;
	if (Party.leader == Player.getName()) {
		ChatLib.command(`party settings allinvite`)
	}
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?([\w\S ]{1,16}): !allinv$/), () => Config().partyallinvite);

registerWhen(register('chat', (rank, name) => {
	if (!Config().partycommands) return;
	if (Party.leader == Player.getName()) {
		let offlinePlayers = Party.members.filter(player => !player.isOnline());
        offlinePlayers.forEach(player => ChatLib.command(`party kick ${player.name}`));
	}
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?([\w\S ]{1,16}): !kickoffline$/), () => Config().partykickoffline);

registerWhen(register('chat', (rank, name, alias, player) => {
	if (!Config().partycommands) return;
	if (Party.leader == Player.getName()) {
		ChatLib.command(`party invite ${player}`)
	}
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?([\w\S ]{1,16}): !(inv|invite|p|party) (.+)$/), () => Config().partyinvite);

