import { useEffect, useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-select-dt';

DataTable.use(DT);

function Jury({ userId }: { userId: number }) {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://localhost:8080/LabManager/api/v4/persons/jurys?id=${userId}`);
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

  useEffect(() => {
    fetchData();
  }, [userId]);

  if (error) {
    return <p>Error: {error}</p>;
  }

interface Supervisor {
    person: {
        name: string;
    };
}

  const columns = [
    { data: 'title', title: 'Title' },
    { data: 'year', title: 'Year' },
    { data: 'candidate.name', title: 'Candidate Name' },
    { data: 'type', title: 'Type' },
    { data: 'university.name', title: 'University' },
    { data: 'university.country', title: 'Country' },
    {
      data: 'university.inFrance',
      title: 'In France',
      render: (data: any) => (data ? 'Yes' : 'No')
    }
  ];
  return (
    
    <pre>
        <link rel="stylesheet" href="https://cdn.datatables.net/2.3.1/css/dataTables.dataTables.css" />
        <DataTable data={data} columns={columns} className="display">
          <thead>
            <tr>
                <th>Title</th>
                <th>Year</th>
                <th>Candidate Name</th>
                <th>Type</th>
                <th>University</th>
                <th>Country</th>

            </tr>
          </thead>
        </DataTable>

    </pre>
  );
}

export default Jury;
