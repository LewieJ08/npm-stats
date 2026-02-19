import { Downloads } from "./downloads.types"

export class DownloadsService {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = 'https://api.npmjs.org/downloads'
    }

    private async request<T>(path: string, options: RequestInit): Promise<T> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            ...options,
            ...options.headers
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`${data}`)
        }

        return data as T;
    }

    public getDownloadsInRange(
        pkg: string, 
        startDate: string, 
        endDate: string
    ): Promise<Downloads> {
        return this.request<Downloads>(`/range/${startDate}:${endDate}/${pkg}`, {
            method: 'GET'
        })
    }
}