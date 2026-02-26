import { ApiError, PackageNotFoundError } from "../errors/errors";
import { MonthDownloads, RangeDownloads } from "./downloads.types"

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

        if (response.status === 404) {
            throw new PackageNotFoundError()
        }

        if (!response.ok) {
            throw new ApiError()
        }

        return data as T;
    }

    public getDownloadsInRange(
        pkg: string, 
        startDate: string, 
        endDate: string
    ): Promise<RangeDownloads> {
        return this.request<RangeDownloads>(`/range/${startDate}:${endDate}/${pkg}`, {
            method: 'GET'
        })
    }

    public getDownloadsLastMonth(pkg: string): Promise<MonthDownloads> {
        return this.request<MonthDownloads>(`/point/last-month/${pkg}`, {
            method: 'GET'
        })
    }
}