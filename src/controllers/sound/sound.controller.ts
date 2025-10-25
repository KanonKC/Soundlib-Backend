import { SoundlibError } from "@/errors/common";
import { CreateSoundRequest, UpdateSoundRequest } from "@/services/sound/request";
import SoundService from "@/services/sound/sound.service";
import { FastifyReply, FastifyRequest } from "fastify";

export default class SoundController {
    private readonly soundSvc: SoundService;
    constructor(soundSvc: SoundService) {
        this.soundSvc = soundSvc;
    }

    async create(req: FastifyRequest<{ Body: CreateSoundRequest }>, res: FastifyReply) {
        try {
            await this.soundSvc.create(req.body);
            res.status(201).send();
        } catch (error) {
            if (error instanceof SoundlibError) {
                res.status(error.status).send({ error: error.message });
            } else {
                res.status(500).send({ error: String(error) });
            }
        }
    }

    async list(req: FastifyRequest, res: FastifyReply) {
        try {
            const sounds = await this.soundSvc.list();
            res.status(200).send(sounds);
        } catch (error) {
            if (error instanceof SoundlibError) {
                res.status(error.status).send({ error: error.message });
            } else {
                res.status(500).send({ error: String(error) });
            }
        }
    }
    
    async getBySlug(req: FastifyRequest<{ Params: { slug: string } }>, res: FastifyReply) {
        try {
            const sound = await this.soundSvc.getBySlug(req.params.slug);
            res.status(200).send(sound);
        } catch (error) {
            if (error instanceof SoundlibError) {
                res.status(error.status).send({ error: error.message });
            } else {
                res.status(500).send({ error: String(error) });
            }
        }
    }

    async updateBySlug(req: FastifyRequest<{ Params: { slug: string }, Body: UpdateSoundRequest }>, res: FastifyReply) {
        try {
            await this.soundSvc.updateBySlug(req.params.slug, req.body);
            res.status(204).send();
        } catch (error) {
            if (error instanceof SoundlibError) {
                res.status(error.status).send({ error: error.message });
            } else {
                res.status(500).send({ error: String(error) });
            }
        }
    }

    async deleteBySlug(req: FastifyRequest<{ Params: { slug: string } }>, res: FastifyReply) {
        try {
            await this.soundSvc.deleteBySlug(req.params.slug);
            res.status(204).send();
        } catch (error) {
            if (error instanceof SoundlibError) {
                res.status(error.status).send({ error: error.message });
            } else {
                res.status(500).send({ error: String(error) });
            }
        }
    }
}