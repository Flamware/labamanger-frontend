import React, { useEffect, useState } from 'react';

const labels = ['Number of members', 'Number of permanent members', 'articles between', 'conference between', 
    'Average number of journals ranked by Scimago / FTE / year (2020-2024)', 'total finished projects',
    'continuing projects', 'started this year'];

const API_BASE_URL = "https://localhost:8080/LabManager/api/v4/";

const Numbers: React.FC = () => {
  // States for each number
  const [members, setMembers] = useState<number | null>(null);
  const [permanentMembers, setPermanentMembers] = useState<number | null>(null);
  const [articlesCount, setArticlesCount] = useState<number | null>(null);
  const [conferenceCount, setConferenceCount] = useState<number | null>(null);
  const [avgRanked, setAvgRanked] = useState<number | null>(null);
  const [finishedProjects, setFinishedProjects] = useState<number | null>(null);
  const [continuingProjects, setContinuingProjects] = useState<number | null>(null);
  const [startedProjects, setStartedProjects] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Helper to fetch single number from API
    const fetchNumber = async (url: string): Promise<number> => {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch ${url}`);
      const data: number = await res.json();
      return data;
    };

    Promise.all([
      fetchNumber(API_BASE_URL+'persons/count'),
      fetchNumber(API_BASE_URL+'persons/permanent/count'),
      fetchNumber(API_BASE_URL+'publications/count'),
      fetchNumber(API_BASE_URL+'conferences/count'),
      fetchNumber(API_BASE_URL+'journals/scimago-journals/average-per-fte'),
      fetchNumber(API_BASE_URL+'projects/stats/finished'),
      fetchNumber(API_BASE_URL+'projects/stats/ongoing'),
      fetchNumber(API_BASE_URL+'projects/stats/started-this-year'),
    ])
      .then(([MembersNum, PermanentMembersNum, ArticlesNum, conferenceNum, avgRankedNum, finishedNum, continuingNum, startedNum]) => {
        setMembers(MembersNum)
        setPermanentMembers(PermanentMembersNum)
        setArticlesCount(ArticlesNum)
        setConferenceCount(conferenceNum)
        setAvgRanked(avgRankedNum)
        setFinishedProjects(finishedNum)
        setContinuingProjects(continuingNum)
        setStartedProjects(startedNum)

        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Erreur inconnue');
        setLoading(false);
      });
  }, []);

  const stats = [
    { label: labels[0], value: members },
    { label: labels[1], value: permanentMembers },
    { label: labels[2], value: articlesCount },
    { label: labels[3], value: conferenceCount },
    { label: labels[4], value: avgRanked },
    { label: labels[5], value: finishedProjects },
    { label: labels[6], value: continuingProjects },
    { label: labels[7], value: startedProjects },
  ];

  return (
    <section className="py-16 text-white">
      <div className="w-full md:w-2/3 mx-auto">
        <h2 className="text-4xl text-lime-400 text-center mb-12 animate-fade-down">
          Nos chiffres clés
        </h2>

        {loading && (
          <p className="text-center text-gray-400">Chargement des chiffres...</p>
        )}

        {error && <p className="text-center text-red-500">Erreur: {error}</p>}

        {!loading && !error && (
          <div className="flex justify-center gap-16 flex-wrap">
            {stats.map(({ label, value }, idx) => (
              <div key={idx} className="text-center min-w-[120px]">
                <div
                  className="text-lime-400 font-extrabold text-4xl"
                  style={{
                    color: '#97bf0d',
                    textShadow: '0 0 2px #84cc16',
                  }}
                >
                  {value !== null ? value.toLocaleString() : '—'}
                </div>
                <div className="mt-2 text-gray-400 text-sm">{label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Numbers;
