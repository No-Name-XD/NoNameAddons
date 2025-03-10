// Credits to AzuredBlue for base

import Config from '../config';
import { registerWhen } from '../../BloomCore/utils/Utils';

const S03_PACKET_TIME_UPDATE = Java.type('net.minecraft.network.play.server.S03PacketTimeUpdate')

let prevTime = null
let averageTps = 20
const tpsWindow = 10

register('worldLoad', () => {
	prevTime = null
	averageTps = 20
})

registerWhen(register('packetReceived', () => {
    if (prevTime !== null) {
        let time = Date.now() - prevTime
        let instantTps = MathLib.clampFloat(20000 / time, 0, 20)
        let alpha = 2 / (tpsWindow + 1)
        averageTps = instantTps * alpha + averageTps * (1 - alpha)
    }
    prevTime = Date.now()
}).setFilteredClass(S03_PACKET_TIME_UPDATE), () => Config().tps)


register("chat", () => {
    if (!Config().tps) return;
    ChatLib.command(`pc Current TPS: ${averageTps.toFixed(2)}`);
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?(\w{1,16}): !tps$/);
