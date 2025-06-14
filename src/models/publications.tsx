export interface PublicationsAuthors {
    name: string;
    id: number;
}

export interface PublicationsDTO {
    title: string;
    doi: string;
    issn: string;
    publicationDate: string;
    publicationType: string;
    persons: PublicationsAuthors[];
    abstractText: string;
    extraUrl: string;
    dblpUrl: string;
    pdfUrl: string;
    awardCertificate: string;
    language: string;
    keywords: string[];
}
