import SoundRepository from '@/repositories/sound/sound.repository';
import { Sound } from '@prisma/client';
import { CreateSoundRequest, UpdateSoundRequest } from './request';
import { CreateSound, UpdateSound } from '@/repositories/sound/request';
import { convertToKebabCase } from '@/utils/string';
import { unlinkSync, writeFileSync } from 'fs';
import { ExtendedSound } from './response';
import { BadRequestError, NotFoundError } from '@/errors/common';
import { ListResponse } from '../types/list';
import { getAudioWaveform } from '@/utils/audio';

export default class SoundService {
    private readonly soundRepo: SoundRepository;
    constructor(soundRepo: SoundRepository) {
        this.soundRepo = soundRepo;
    }

    extendSound(s: Sound): ExtendedSound {
        return {
            id: s.id,
            slug: s.slug,
            title: s.title,
            author: s.author,
            description: s.description,
            tags: s.tags?.split(',') || [],
            fileType: s.file_type,
            audioWaveform: s.audio_waveform?.split(',').map(Number) || [],
        };
    }

    async create(r: CreateSoundRequest): Promise<ExtendedSound> {

        const body: CreateSound = {
            slug: convertToKebabCase(r.slug),
            title: r.title,
            author: r.author,
            description: r.description,
            tags: r.tags?.join(','),
            fileType: r.fileType,
        };

        const sound = await this.soundRepo.create(body);

        const filename = `${sound.id}.${r.fileType}`;
        try {
            const buffer = Buffer.from(r.base64, 'base64');
            writeFileSync(`./public/sound-profiles/${filename}`, buffer);
        } catch (error) {
            await this.soundRepo.deleteBySlug(sound.slug);
            throw new BadRequestError(String(error));
        }

        const waveform = await getAudioWaveform(`./public/sound-profiles/${filename}`, 20);
        await this.soundRepo.updateAudioWaveform(sound.id, waveform);

        return this.extendSound(sound);
    }

    async list(): Promise<ListResponse<ExtendedSound[]>> {
        const sounds = await this.soundRepo.list();
        return {
            data: sounds.map(this.extendSound),
            total: sounds.length,
        };
    }

    async getBySlug(slug: string): Promise<ExtendedSound> {
        const sound = await this.soundRepo.getBySlug(slug);
        if (!sound) {
            throw new NotFoundError('Sound not found');
        }
        return this.extendSound(sound);
    }

    async updateBySlug(slug: string, r: UpdateSoundRequest): Promise<ExtendedSound> {
        const body: UpdateSound = {
            title: r.title,
            author: r.author,
            description: r.description,
            tags: r.tags?.join(','),
        };
        const sound = await this.soundRepo.updateBySlug(slug, body);
        if (!sound) {
            throw new NotFoundError('Sound not found');
        }
        return this.extendSound(sound);
    }

    async deleteBySlug(slug: string): Promise<void> {
        const sound = await this.soundRepo.getBySlug(slug);
        if (!sound) {
            throw new NotFoundError('Sound not found');
        }
        try {
            unlinkSync(`./public/sound-profiles/${sound.id}.${sound.file_type}`);
        } catch (error) {
            throw new BadRequestError(String(error));
        }
        await this.soundRepo.deleteBySlug(slug);
        return;
    }
}
