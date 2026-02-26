export class CliError extends Error {
    public readonly exitCode: number;

    constructor(message: string, exitCode: number = 1) {
        super(message);
        this.exitCode = exitCode;
        this.name = 'CliError';
    }
}

export class PackageNotFoundError extends CliError {
    constructor() {
        super(`Package does not exist`);
        this.name = 'PackageNotFoundError'
    }
}

export class ApiError extends CliError {
    constructor() {
        super('Failed to fetch package data.');
        this.name = 'ApiError'
    }
}














