import { readFileSync } from "fs";
import SoundRepository from "./repositories/sound/sound.repository";
import SoundService from "./services/sound/sound.service";
import { PrismaClient } from "@prisma/client";
import { getAudioWaveform } from "./utils/audio";

const prisma = new PrismaClient();

const soundRepo = new SoundRepository(prisma);
const soundSvc = new SoundService(soundRepo);

(async () => {
    // Make sample.mp3 to base64
    getAudioWaveform('sample.mp3',100).then((r) => console.log(r, r.length));
})()