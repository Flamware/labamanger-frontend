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
      const response = await fetch(`https://localhost:8080/LabManager/api/v4/persons/getTeaching/${userId}`);
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



    const columns = [
        { data: 'code', title: 'Code' },
        { data: 'title', title: 'Title' },
        { data: 'degree', title: 'Degree' },
        { data: 'university.name', title: 'University Name' },

    ];
  return (
    
    <pre>
        <link rel="stylesheet" href="https://cdn.datatables.net/2.3.1/css/dataTables.dataTables.css" />
        <DataTable data={data} columns={columns} className="display">
          <thead>
            <tr>
                <th>Code</th>
                <th>Title</th>
                <th>Degree</th>
                <th>University Name</th>



            </tr>
          </thead>
        </DataTable>

    </pre>
  );
}

export default Jury;
