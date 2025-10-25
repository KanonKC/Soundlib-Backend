import { Album, PrismaClient } from "@prisma/client";
import { CreateAlbum } from "./request";

export default class AlbumRepository {
    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async create(album: CreateAlbum): Promise<Album> {
        return this.prisma.album.create({
            data: {
                title: album.title,
                description: album.description,
                sounds: {
                    connect: album.sounds?.map((sound) => ({
                        id: sound,
                    })),
                },
            },
        });
    }

    async list(): Promise<Album[]> {
        return this.prisma.album.findMany({
            include: {
                sounds: true,
            },
        });
    }
}