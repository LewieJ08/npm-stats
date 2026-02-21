export function daysSince(datetime: string): number {
    const now = new Date().valueOf()
    const date = new Date(datetime).valueOf();

    const diff = now - date
    const daysDiff = Math.ceil(diff / (1000 * 3600 * 24));

    return daysDiff
}