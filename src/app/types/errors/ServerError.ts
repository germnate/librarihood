interface ServerError {
    status: number;
    message: string;
}

function conformsToServerError(error: unknown): error is ServerError {
    return typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof error.message === 'string'
}

export type { ServerError }
export { conformsToServerError }