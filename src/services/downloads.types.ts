type DayDownloads = {
    downloads: number;
    day: string;
}

interface Downloads{
    start: string;
    end: string;
    package: string;
}

export interface RangeDownloads extends Downloads {
    downloads: DayDownloads[];
}

export interface MonthDownloads extends Downloads {
    downloads: number
}