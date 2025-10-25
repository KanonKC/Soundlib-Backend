
export interface ExtendedSound {
    id: string;
    slug: string;
    title: string;
    author: string | null;
    description: string | null;
    tags: string[];
    audioWaveform: number[];
    fileType: string;
}