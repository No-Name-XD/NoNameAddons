// Credits to AzuredBlue for base

import Config from '../config';
import { registerWhen } from '../../BloomCore/utils/Utils';

const S03_PACKET_TIME_UPDATE = Java.type('net.minecraft.network.play.server.S03PacketTimeUpdate')
const S37PacketStatistics = Java.type('net.minecraft.network.play.server.S37PacketStatistics')
const C16PacketClientStatus = Java.type('net.minecraft.network.play.client.C16PacketClientStatus')

const S01PacketJoinGame = Java.type('net.minecraft.network.play.server.S01PacketJoinGame')
const System = Java.type('java.lang.System')

let prevTime = null
let averageTps = 20
const tpsWindow = 10
let isPinging = false
let pingCache = -1
let lastPingAt = -1


/// PING ///
registerWhen(register('worldLoad', () => {
	pingCache = -1
	isPinging = false
}), () => Config().ping);

registerWhen(register('step', () => {
    
    if (!isPinging) {
        Client.sendPacket(new C16PacketClientStatus(C16PacketClientStatus.EnumState.REQUEST_STATS))
        lastPingAt = System.nanoTime()
        isPinging = true
    }
}).setFps(1), () => Config().ping);

registerWhen(register('packetReceived', () => {
    if (lastPingAt > 0) {
        lastPingAt = -1
        isPinging = false
    }
}).setFilteredClass(S01PacketJoinGame), () => Config().ping)

registerWhen(register('packetReceived', () => {
    if (lastPingAt > 0) {
        let diff = Math.abs((System.nanoTime() - lastPingAt) / 1_000_000)
        lastPingAt *= -1
        pingCache = diff
        isPinging = false
    }
}).setFilteredClass(S37PacketStatistics), () => Config().ping)

registerWhen(register("chat", () => {
    ChatLib.command(`pc [NoNameAddons] PING: ${parseInt(pingCache)}ms`);
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?([\w\S ]{1,16}): !ping$/), () => Config().ping);



/// TPS ///
registerWhen(register('worldLoad', () => {
	prevTime = null
	averageTps = 20
}), () => Config().tps);


registerWhen(register('packetReceived', () => {
    if (prevTime !== null) {
        let time = Date.now() - prevTime
        let instantTps = MathLib.clampFloat(20000 / time, 0, 20)
        let alpha = 2 / (tpsWindow + 1)
        averageTps = instantTps * alpha + averageTps * (1 - alpha)
    }
    prevTime = Date.now()
}).setFilteredClass(S03_PACKET_TIME_UPDATE), () => Config().tps);


registerWhen(register("chat", () => {
    ChatLib.command(`pc [NoNameAddons] TPS: ${averageTps.toFixed(2)}`);
}).setCriteria(/Party > (?:\[([^\]]*?)\] )?([\w\S ]{1,16}): !tps$/), () => Config().tps);
