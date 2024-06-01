import StatusCode from '../interfaces/StatusCodes';

export class AppError extends Error {
    public readonly status: number;
    public readonly isCatastrophic: boolean;

    constructor(
        description: string,
        status: StatusCode,
        isCatastrophic: boolean = false
    ) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

        this.status = status;
        this.isCatastrophic = isCatastrophic;

        Error.captureStackTrace(this);
    }
}
