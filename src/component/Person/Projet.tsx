import { useEffect, useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-select-dt';

DataTable.use(DT);

function Project({ userId }: { userId: number }) {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://localhost:8080/LabManager/api/v4/projects/byPersonId/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch projects data');
      let dataFetched = await response.json();
      
      const data = dataFetched.body
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

  if (data.length === 0) {
    return <p>Loading...</p>;
  }
const columns = [
    { data: 'acronym', title: 'Acronyme' },
    { data: 'title', title: 'Titre' },
    {
    data: 'organizations.learOrganization',
    title: 'Financement',
    render: (data: any) => data || 'N/A',
    },
    {
      data: 'date.startDate',
      title: 'Début',
      render: (data: any) => data || 'N/A',
    },
    {
      data: 'date.endDate',
      title: 'Fin',
      render: (data: any) => data || 'N/A',
    },


  ];
  return (
    
    <pre>
        <link rel="stylesheet" href="https://cdn.datatables.net/2.3.1/css/dataTables.dataTables.css" />

        <DataTable data={data} columns={columns} className="display">
          <thead>
            <tr>
              <th>acronym</th>

            </tr>
          </thead>
        </DataTable>
    </pre>
  );
}

export default Project;
