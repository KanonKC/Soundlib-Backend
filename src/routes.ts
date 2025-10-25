import fastifyStatic from "@fastify/static";
import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import path from "path";
import SoundRepository from "./repositories/sound/sound.repository";
import SoundService from "./services/sound/sound.service";
import SoundController from "./controllers/sound/sound.controller";
import fastifyCors from "@fastify/cors";

const server = fastify();

const prisma = new PrismaClient();

const soundRepo = new SoundRepository(prisma);
const soundSvc = new SoundService(soundRepo);
const soundCtrl = new SoundController(soundSvc);

server.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
})

server.register(fastifyStatic, {
    root: path.join(process.cwd(), 'public'),
    prefix: '/',
    // wildcard: true,
})

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.post("/sounds", soundCtrl.create.bind(soundCtrl));
server.get("/sounds", soundCtrl.list.bind(soundCtrl));
server.get("/sounds/:slug", soundCtrl.getBySlug.bind(soundCtrl));
server.put("/sounds/:slug", soundCtrl.updateBySlug.bind(soundCtrl));
server.delete("/sounds/:slug", soundCtrl.deleteBySlug.bind(soundCtrl));

export default server;