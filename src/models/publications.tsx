export interface PersonOnWebsite {
    name: string;
    webPageId: string;
}

export interface PublicationsDTO {
  title: string;
  doi: string;
  issn: string;
  publicationDate: string;
  publicationType: string;
  persons: PersonOnWebsite[];
  abstractText: string;
  pdfUrl: string;
  language: string;
  keywords: string[];
}