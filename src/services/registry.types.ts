type Maintainer = {
    name: string;
    email: string;
} 

export interface RegistryInfo {
    name: string;
    time: {
        created: string;
        modified: string;
    };
    author?: {
        name: string
    };
    license: string;
    maintainers: Maintainer[];
}