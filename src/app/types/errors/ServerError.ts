interface ServerError {
    status: number;
    message: string;
    data: unknown
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function conformsToServerError(error: any): boolean {
    if (!error) return false;
    if (typeof error.status === 'number' &&
        typeof error.message === 'string' &&
        typeof error.data === 'object'
    ) return true;
    return false;
}

export type { ServerError }
export { conformsToServerError }