// src/components/Team.tsx (or Equipe.tsx)
import React, { useState, useMemo } from 'react';
import { useTeam } from '../hooks/useTeam';
import backgroundTeam from "../assets/FOND-FILAIRE-LUEUR-GAUCHE.jpg"; // Reusing or a new specific background

function Team() {
  const { teamData, loading, error, refetch } = useTeam();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

  // Search State
  const [searchTerm, setSearchTerm] = useState('');

  // Memoized filtered and paginated data
  const filteredAndPaginatedData = useMemo(() => {
    let filteredData = teamData;

    // Apply search filter
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filteredData = teamData.filter(
          (person) =>
              person.fullName.toLowerCase().includes(lowerCaseSearchTerm) ||
              person.civilTitle.toLowerCase().includes(lowerCaseSearchTerm) ||
              (person.Email && person.Email.toLowerCase().includes(lowerCaseSearchTerm)) ||
              person.organizationName.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // Calculate pagination values
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    return {
      currentItems,
      totalItems: filteredData.length,
      totalPages: Math.ceil(filteredData.length / itemsPerPage),
    };
  }, [teamData, searchTerm, currentPage, itemsPerPage]);

  const { currentItems, totalItems, totalPages } = filteredAndPaginatedData;

  // Change page handler
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle items per page change
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  // --- Loading, Error, and Empty States (Updated Styling) ---
  if (loading) {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white"
             style={{ backgroundImage: `url(${backgroundTeam})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-lime-500"></div>
          <p className="mt-6 text-xl text-gray-300 animate-pulse">Chargement des données de l'équipe...</p>
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-red-400"
             style={{ backgroundImage: `url(${backgroundTeam})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
          <p className="text-2xl font-bold">Erreur de chargement des données:</p>
          <p className="text-lg mt-4 text-gray-300 text-center px-4">{error}</p>
          <button
              onClick={refetch}
              className="mt-8 px-6 py-3 bg-lime-500 text-black font-semibold rounded-full hover:bg-lime-600 transition-all duration-300 shadow-lg"
          >
            Réessayer
          </button>
        </div>
    );
  }

  return (
      <div
          className="text-white min-h-screen flex flex-col bg-gray-900"
          style={{ backgroundImage: `url(${backgroundTeam})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}
      >
        <section className="relative text-center overflow-hidden py-5 md:py-12 bg-black"> {/* Added opacity for background visibility */}
          <div className="container mx-auto px-4 relative z-10 bg-black">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-lime-400 animate-fade-down animate-delay-100">
              Notre Équipe
            </h1>
            <p className="text-lg md:text-xl text-gray-300 animate-fade-up animate-delay-200">
              Découvrez les membres qui composent notre force d'innovation.
            </p>
          </div>
        </section>

        <section className="flex-grow w-full flex justify-center py-8 md:py-12 bg-gradient-to-b from-black"> {/* Adjusted background for content section */}
          <div className="container mx-auto px-4 md:px-8">
            {/* Search and Items per Page controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative w-full sm:w-1/2 lg:w-1/3">
                <input
                    type="text"
                    placeholder="Rechercher par nom, titre, email, organisation..."
                    className="w-full pl-10 pr-4  border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 placeholder-gray-400"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // Reset to first page on new search
                    }}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-gray-300">
                <label htmlFor="itemsPerPage" className="text-sm">Éléments par page:</label>
                <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="border border-gray-600 bg-gray-800 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-lime-500"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto bg-gray-800 shadow-xl rounded-lg">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Nom Prénom
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Titre
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Organisations
                  </th>
                </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                {currentItems.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-6 whitespace-nowrap text-center text-gray-400 text-lg">
                        {searchTerm ? "Aucun résultat trouvé pour votre recherche." : "Aucune donnée d'équipe disponible."}
                      </td>
                    </tr>
                ) : (
                    currentItems.map((person) => (
                        <tr key={person.id} className="hover:bg-gray-700 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-lime-400">
                            <a
                                href={`/Person/${person.id}`}
                                className="hover:text-lime-200 hover:underline transition-colors"
                            >
                              {person.fullName}
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {person.civilTitle}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {person.Email || <span className="text-gray-500 italic">N/A</span>}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {person.organizationName}
                          </td>
                        </tr>
                    ))
                )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalItems > 0 && ( // Only show pagination if there are items
                <div className="flex flex-col sm:flex-row justify-between items-center mt-8 space-y-4 sm:space-y-0">
                  <div className="text-sm text-gray-400">
                    Affichage de <span className="font-semibold text-white">{Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}</span> à <span className="font-semibold text-white">{Math.min(currentPage * itemsPerPage, totalItems)}</span> sur <span className="font-semibold text-white">{totalItems}</span> éléments.
                  </div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <span className="sr-only">Précédent</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => paginate(page)}
                            className={`relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium transition-colors ${
                                page === currentPage ? 'z-10 bg-lime-700 border-lime-700 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                          {page}
                        </button>
                    ))}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <span className="sr-only">Suivant</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
            )}
          </div>
        </section>
        {/* Optional: Add a Footer component if you have one, similar to Home */}
        {/* <Footer isBlack /> */}
      </div>
  );
}

export default Team;