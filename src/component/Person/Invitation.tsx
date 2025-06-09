import { useEffect, useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-select-dt';

DataTable.use(DT);

function Jury({ userId }: { userId: number }) {
  const [dataGuest, setDataGuest] = useState<any[]>([]);
  const [dataInviter, setDataInviter] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchDataInviter = async () => {
    try {
      const response = await fetch(`https://localhost:8080/LabManager/api/v4/persons/inviterInvitations?id=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch projects data');
      let dataFetched = await response.json();
      
      const data = dataFetched.INCOMING_GUEST_PROFESSOR
      setDataInviter(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
  };

    const fetchDataGuest = async () => {
    try {
      const response = await fetch(`https://localhost:8080/LabManager/api/v4/persons/guestInvitations?id=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch projects data');
      let dataFetched = await response.json();
      
      const data = dataFetched.INCOMING_GUEST_PROFESSOR
      setDataGuest(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
  };

  useEffect(() => {
    fetchDataInviter();
    fetchDataGuest();
  }, [userId]);

  if (error) {
    return <p>Error: {error}</p>;
  }



  const columns = [
    { data: 'title', title: 'Titre' },
    { data: 'guest.name', title: 'Nom invité' ,
      render: (data: any, type: string, row: any) => {
        if (type === 'display') {
          return `<a href="/Person/${row.guestId}">${data}</a>`;
        }
        return data;
      }},
    { data: 'university.name', title: 'Université' },
    { data: 'university.country', title: 'Pays' },

    { data: 'dates.startDate', title: 'Date début' },
    { data: 'dates.endDate', title: 'Date fin' }
  ];
  return (
    
    <pre>
        <link rel="stylesheet" href="https://cdn.datatables.net/2.3.1/css/dataTables.dataTables.css" />
        <h3><strong>Invitations en tant qu'inviteur</strong></h3>
        <DataTable data={dataInviter} columns={columns} className="display">
          <thead>
            <tr>
                <th>Titre</th>
                <th>Nom invité</th>
                <th>Université</th>
                <th>Pays</th>
                <th>Date début</th>
                <th>Date fin</th>
            </tr>
          </thead>
        </DataTable>
        <h3><strong>Invitations en tant qu'invité</strong></h3>
        <DataTable data={dataGuest} columns={columns} className="display">
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>Nom invité</th>
                    <th>Université</th>
                    <th>Pays</th>
                    <th>Date début</th>
                    <th>Date fin</th>
                </tr>
            </thead>
        </DataTable>
        
    </pre>
  );
}

export default Jury;
