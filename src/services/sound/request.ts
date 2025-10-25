export interface CreateSoundRequest {
    slug: string;
    title: string;
    author?: string;
    description?: string;
    tags?: string[];
    fileType: string;
    base64: string;
}

export interface UpdateSoundRequest {
    title?: string;
    author?: string;
    description?: string;
    tags?: string[];
}