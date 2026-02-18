import { RegistryService } from "../services/registry.service";
import { DownloadsService } from "../services/downloads.service";

export async function npmstats(pkg: string): Promise<void> {
    try {
        const registry = new RegistryService(); 
        const downloads = new DownloadsService();
        const pkgInfo = await registry.getInfo(pkg);

        const authorName = pkgInfo.author.name;
        const startDate = pkgInfo.time.created.split('T')[0] || '';
        const lastRelease = pkgInfo.time.modified.split('T')[0] || '';

        const pkgDownloads = await downloads.getDownloadsInRange(pkg, startDate, lastRelease);

        let totalDownloads: number = 0;
        for (const downloads of pkgDownloads.downloads) {
            totalDownloads += downloads.downloads;
        }

        let totalMaintainers: number = 0;
        for (const _ of pkgInfo.maintainers) {
            totalMaintainers++;
        }

        console.log(`Package: ${pkgInfo.name}`);
        console.log(`Author: ${authorName}`)
        console.log(`Total Downloads: ${totalDownloads}`);
        console.log(`Last Release: ${lastRelease}`);
        console.log(`Maintainers: ${totalMaintainers}`);
        console.log(`License: ${pkgInfo.license}`)
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? 
            error.message 
        : 
            'Unknown Error Occured'
        console.log(errorMessage);
        process.exit(1);
    }
}   

