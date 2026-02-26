import { PackageInfo } from "./registry.types";
import { ApiError, PackageNotFoundError } from "../errors/errors";

export class RegistryService {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = 'https://registry.npmjs.org'
    }

    private async request<T>(path: string, options: RequestInit): Promise<T> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            ...options,
            ...options.headers
        })

        const data = await response.json();

        if (response.status === 404) {
            throw new PackageNotFoundError()
        }

        if (!response.ok) {
            throw new ApiError()
        }

        return data as T;
    }

    public getInfo(pkg: string): Promise<PackageInfo> {
        return this.request<PackageInfo>(`/${pkg}`, {
            method: 'GET'
        })
    }
}