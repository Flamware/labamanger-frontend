import React from 'react';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { FiExternalLink } from 'react-icons/fi';
import { SiDblp } from 'react-icons/si';

interface Person {
    name: string;
}

interface Publication {
    title: string;
    issn: string;
    publicationType: string;
    language: string;
    abstractText: string;
    publicationDate: string;
    pdfUrl?: string;
    extraUrl?: string;
    dblpUrl?: string;
    awardCertificate?: string;
    keywords: string[];
    persons: Person[];
}

interface Props {
    publications: Publication[];
    expandedIndex: number | null;
    toggleExpand: (index: number) => void;
}

const PublicationList: React.FC<Props> = ({ publications, expandedIndex, toggleExpand }) => {
    return (
        <>
            {publications.map((pub, index) => {
                const isExpanded = expandedIndex === index;

                return (
                    <div
                        key={index}
                        className="bg-gray-800 rounded-xl shadow-md p-6 mb-6 cursor-pointer"
                        onClick={() => toggleExpand(index)}
                    >
                        <h2 className="text-xl font-semibold mb-2">{pub.title}</h2>
                        <p className="text-gray-400 text-sm mb-2">ISSN : {pub.issn}</p>
                        <div className="text-gray-300 text-sm">
                            {pub.persons.map(p => p.name).join(', ')}
                        </div>

                        {isExpanded && (
                            <>
                                <p className="text-gray-400 text-sm mt-2">
                                    Type : {pub.publicationType} | Langue : {pub.language}
                                </p>
                                <p className="text-gray-300 mt-2 text-justify">{pub.abstractText}</p>
                                <p className="text-gray-400 text-sm mt-2">
                                    Date de publication : {pub.publicationDate}
                                </p>

                                <div className="flex items-center space-x-4 mt-3 text-xl text-blue-400">
                                    {pub.pdfUrl && (
                                        <a href={pub.pdfUrl} target="_blank" rel="noopener noreferrer" title="PDF">
                                            <AiOutlineFilePdf />
                                        </a>
                                    )}
                                    {pub.extraUrl && (
                                        <a href={pub.extraUrl} target="_blank" rel="noopener noreferrer" title="Lien">
                                            <FiExternalLink />
                                        </a>
                                    )}
                                    {pub.dblpUrl && (
                                        <a href={pub.dblpUrl} target="_blank" rel="noopener noreferrer" title="DBLP">
                                            <SiDblp />
                                        </a>
                                    )}
                                </div>

                                {pub.awardCertificate && (
                                    <div className="text-yellow-400 text-sm mt-2">
                                        🏆 Certificat de récompense disponible
                                    </div>
                                )}

                                {pub.keywords.length > 0 && (
                                    <div className="mt-2 text-sm text-gray-400">
                                        <span>Mots-clés : </span>
                                        {pub.keywords.join(', ')}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                );
            })}
        </>
    );
};

export default PublicationList;
