import { PrismaClient, Sound } from "@prisma/client";
import { CreateSound, UpdateSound } from "./request";

export default class SoundRepository {
    private readonly prisma: PrismaClient;
    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async create(r: CreateSound): Promise<Sound> {
        return this.prisma.sound.create({
            data: {
                slug: r.slug,
                title: r.title,
                author: r.author || null,
                description: r.description || null,
                tags: r.tags || null,
                file_type: r.fileType,
            },
        });
    }

    async list(): Promise<Sound[]> {
        return this.prisma.sound.findMany({
            orderBy: {
                created_at: 'desc',
            },
        });
    }

    async getBySlug(slug: string): Promise<Sound | null> {
        return this.prisma.sound.findUnique({
            where: {
                slug,
            },
        });
    }

    async updateBySlug(slug: string, r: UpdateSound): Promise<Sound | null> {
        return this.prisma.sound.update({
            where: {
                slug,
            },
            data: {
                title: r.title,
                author: r.author || null,
                description: r.description || null,
                tags: r.tags || null,
            },
        });
    }

    async deleteBySlug(slug: string): Promise<Sound | null> {
        return this.prisma.sound.delete({
            where: {
                slug,
            },
        });
    }

    async updateAudioWaveform(id: string, waveform: number[]): Promise<Sound | null> {
        return this.prisma.sound.update({
            where: {
                id,
            },
            data: {
                audio_waveform: waveform.join(','),
            },
        });
    }
}