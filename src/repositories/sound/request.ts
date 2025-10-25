export interface CreateSound {
    slug: string;
    title: string;
    author?: string;
    description?: string;
    tags?: string;
    fileType: string;
}

export interface UpdateSound {
    title?: string;
    author?: string;
    description?: string;
    tags?: string;
}