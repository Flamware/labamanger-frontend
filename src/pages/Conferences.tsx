import { useState, useEffect } from 'react';
import ConferenceList from "../component/Conference/ConferenceList"
import { ConferenceData } from '../component/model/ConferenceData';


const Conferences: React.FC = () => {

  const [data, setData] = useState<ConferenceData[]>([]);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    console.log("Fetching data...");
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await fetch(`https://localhost:8080/LabManager/api/v4/conferences/conferenceWithYear`);
      if (!response.ok) throw new Error('Failed to fetch projects data');
      let dataFetched = await response.json();

      const data = dataFetched
      setData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (<div>

    <h1>Conferences, Seminars and Events</h1>
    <h2>Conferences and Workshops related to CIAD</h2>
    <ConferenceList conferences={data} />
  </div>

  );


}


export default Conferences;