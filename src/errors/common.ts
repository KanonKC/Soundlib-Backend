export class SoundlibError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export class NotFoundError extends SoundlibError {
    constructor(message: string) {
        super(404, message);
    }
}

export class BadRequestError extends SoundlibError {
    constructor(message: string) {
        super(400, message);
    }
}