export interface PersonOnWebsite {
    name: string;
    webPageId: string; // TODO voir avec Kevin pour la page person
}

export interface PublicationsDTO {
    title: string;
    doi: string;
    issn: string;
    publicationDate: string;
    publicationType: string;
    persons: PersonOnWebsite[];
    abstractText: string;
    extraUrl: string;
    dblpUrl: string;
    pdfUrl: string;
    awardCertificate: string;
    language: string;
    keywords: string[];
}
