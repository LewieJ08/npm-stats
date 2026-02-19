type DayDownloads = {
    downloads: number;
    day: string;
}

export interface Downloads{
    start: string;
    end: string;
    package: string;
    downloads: DayDownloads[];
}