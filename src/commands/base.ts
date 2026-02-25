import { RegistryService } from "../services/registry.service";
import { DownloadsService } from "../services/downloads.service";
import { daysSince } from "../utils/time.utils";

export async function baseCommand(pkg: string): Promise<void> {
    try {
        const registry = new RegistryService(); 
        const downloads = new DownloadsService();
        const pkgInfo = await registry.getInfo(pkg);

        // Registry Package Info
        const authorName = pkgInfo.author ? pkgInfo.author.name : 'Author Not Listed';
        const startDate = pkgInfo.time.created.split('T')[0] || '';
        const lastRelease = pkgInfo.time.modified.split('T')[0] || '';
        
        // Calculate Days since last version release
        const daysSinceLastRelease = daysSince(lastRelease);
        
        // Fetch download info since start and last month
        const pkgDownloads = await downloads.getDownloadsInRange(pkg, startDate, lastRelease);
        const pkgDownloadsMonth = await downloads.getDownloadsLastMonth(pkg)

        // Calulate total downloads
        let totalDownloads: number = 0;
        let days: number = 0;
        for (const downloads of pkgDownloads.downloads) {
            totalDownloads += downloads.downloads;
            days++;
        }

        // Average downloads per day
        const dailyAverage = Math.floor(totalDownloads / days);

        // Calculate total maintainers
        let totalMaintainers: number = 0;
        for (const _ of pkgInfo.maintainers) {
            totalMaintainers++;
        }

        console.log(`Package: ${pkgInfo.name}`);
        console.log(`Author: ${authorName}`);
        console.log(`Total Downloads: ${totalDownloads.toLocaleString()}`);
        console.log(`Last 30 Days ${pkgDownloadsMonth.downloads.toLocaleString()}`)
        console.log(`Avg/day: ${dailyAverage.toLocaleString()}`);
        console.log(`Last Release: ${daysSinceLastRelease} days ago`);
        console.log(`Maintainers: ${totalMaintainers}`);
        console.log(`License: ${pkgInfo.license}`);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? 
            error.message 
        : 
            'Unknown Error Occured'
        console.log(errorMessage);
        process.exit(1);
    }
}   

