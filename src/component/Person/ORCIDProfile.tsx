import { useEffect, useState } from 'react';


function App({lien}: { lien: string }) {
  const [orcidData, setOrcidData] = useState(null);
  const [error, setError] = useState<string | null>(null);
const orcid_id = lien.split('/').pop();
  const fetchOrcidData = async () => {
    try {
      const response = await fetch(`https://localhost:8080/LabManager/api/v4/persons/ORCID/${orcid_id}`);
      if (!response.ok) throw new Error('Failed to fetch ORCID data');
      const data = await response.json();
      const biography = data.biography.content || ''; 
      setOrcidData(biography);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
  };

  useEffect(() => {
    fetchOrcidData();
  }, []);

  return (
    <p>{orcidData}</p>
  );
}

export default App;
