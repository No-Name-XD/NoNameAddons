// Credits to kiwidotzip for base

import Config from "../config";
import Party from "../../BloomCore/Party"

register('chat', (rank, name) => {
    if (name === Player.getName()) return;
	if (!Config().partytransfer) return;
	if (!Config().partycommands) return;
	if (Party.leader == Player.getName()) {
		ChatLib.command(`party transfer ${name}`)
	}
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !ptme$/)

register('chat', (rank, name) => {
	if (!Config().partywarp) return;
	if (!Config().partycommands) return;
	if (Party.leader == Player.getName()) {
		ChatLib.command(`party warp`)
	}
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !warp$/)

register('chat', (rank, name) => {
	if (!Config().partyallinvite) return;
	if (!Config().partycommands) return;
	if (Party.leader == Player.getName()) {
		ChatLib.command(`party settings allinvite`)
	}
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !allinv$/)

register('chat', (rank, name) => {
	if (!Config().partykickoffline) return;
	if (!Config().partycommands) return;
	if (Party.leader == Player.getName()) {
		let offlinePlayers = Party.members.filter(player => !player.isOnline());
        offlinePlayers.forEach(player => ChatLib.command(`party kick ${player.name}`));
	}
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !kickoffline$/)

register('chat', (rank, name, alias, player) => {
	if (!Config().partyinvite) return;
	if (!Config().partycommands) return;
	if (Party.leader == Player.getName()) {
		ChatLib.command(`party invite ${player}`)
	}
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !(inv|invite|p|party) (.+)$/)

