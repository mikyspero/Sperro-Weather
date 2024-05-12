export class WebError extends Error {
    status: number;

    constructor(errorMessage: string, errorCode: number) {
        super(errorMessage);
        this.status = errorCode;
    }
}