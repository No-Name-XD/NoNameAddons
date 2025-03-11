import Config from "../config";
import Party from "../../BloomCore/Party"
import { registerWhen } from "../../BloomCore/utils/Utils";

registerWhen(register("chat", (rank, name, floor) => { 
    if (!Config().partycommands) return;
    if (Party.leader != Player.getName()) return; // Ensure you are the party leader

    const floorMap = {
        "f1": "CATACOMBS_FLOOR_ONE",
        "f2": "CATACOMBS_FLOOR_TWO",
        "f3": "CATACOMBS_FLOOR_THREE",
        "f4": "CATACOMBS_FLOOR_FOUR",
        "f5": "CATACOMBS_FLOOR_FIVE",
        "f6": "CATACOMBS_FLOOR_SIX",
        "f7": "CATACOMBS_FLOOR_SEVEN",
        "m1": "MASTER_CATACOMBS_FLOOR_ONE",
        "m2": "MASTER_CATACOMBS_FLOOR_TWO",
        "m3": "MASTER_CATACOMBS_FLOOR_THREE",
        "m4": "MASTER_CATACOMBS_FLOOR_FOUR",
        "m5": "MASTER_CATACOMBS_FLOOR_FIVE",
        "m6": "MASTER_CATACOMBS_FLOOR_SIX",
        "m7": "MASTER_CATACOMBS_FLOOR_SEVEN"
    };

    const floorKey = floor.toLowerCase(); // Ensure case-insensitivity
    if (!floorMap[floorKey]) return; // Invalid floor

    ChatLib.command(`joininstance ${floorMap[floorKey]}`);
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !(f[1-7]|m[1-7])$/), () => Config().joincata)
