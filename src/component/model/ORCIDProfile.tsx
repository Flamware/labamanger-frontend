import { useEffect, useState } from 'react';

const orcid_id = '0000-0002-1559-7861';

function App() {
  const [orcidData, setOrcidData] = useState(null);
  const [error, setError] = useState<string | null>(null);

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
