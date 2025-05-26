export interface Projects {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    videoUrls: string[];
    state: number; // is a number percentage
    category: 'all' | 'partner' | 'research';
}

export interface BackendProject {
    acronym: string;
    id: number;
    title: string;
    description: null | string;
    date: {
        startDate: string;
        endDate: string;
    };
    organizations: {
        superOrganization: string;
        learOrganization: string;
        localOrganization: string;
        partners: string[]; // Adjust type as needed
    };
    participants: string[]; // Adjust type as needed
    images: string[]; // Adjust type as needed
    logo: null | string;
    links: {
        projectUrl: string;
        videoLinks: string[];
        partnersLinks: Record<string, string>;
    };
    webpageId: null | string;
    openSource: boolean;
    isDone: boolean;
}
