import { useState, useEffect } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-select-dt';

DataTable.use(DT);

function Equipe() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      console.log("Fetching data from API...");
      const response = await fetch(`https://localhost:8080/LabManager/api/v4/persons/getAllPerson`);
      if (!response.ok) throw new Error('Failed to fetch projects data');
      let dataFetched = await response.json();
      const data = dataFetched
      console.log("Data fetched successfully:", data);
      setData(data);
      console.log(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
  };

  useEffect(() => {
    console.log("Fetching data...");
    fetchData();
  }, []);

  const columns = [
    { data: 'fullName', title: 'Nom Prénom',
      render: (data: any, type: string, row: any) => {
        if (type === 'display') {
          return `<a href="/Person/${row.id}">${data}</a>`;
        }
        return data;
      }
     },
    { data: 'civilTitle', title: 'Titre', },
    {
      data: 'Email',
      title: 'Email',
      render: (data: any) => data || 'N/A', // Handle null or undefined values
    },
    { data: 'organizationName', title: 'Organisations' },
  ];

  return (
    <div>
      <link rel="stylesheet" href="https://cdn.datatables.net/2.3.1/css/dataTables.dataTables.css" />

      <div className="w-full p-4">

        <div>
        <DataTable data={data} columns={columns} className="display" options={{
          responsive: true, select: true, scrollCollapse: true,}}>
        </DataTable>
        </div>
      </div>
    </div>
  );
}

export default Equipe;
