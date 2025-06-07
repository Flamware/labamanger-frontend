import { useState, useEffect } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-select-dt';

DataTable.use(DT);

function Equipe() {
  const [fetchedData, setFetchedData] = useState([['Loading...']]);

  const [tableData] = useState([
    ['Tiger Nixon'],
    ['Tiger Nixon'],
    ['Tiger Nixon'],
    ['Tiger Nixon'],
    ['Tiger Nixon'],
    ['Tiger Nixon'],
    ['Tiger Nixon'],
    ['Tiger Nixon'],
    ['Tiger Nixon'],
    ['Tiger Nixon'],
    ['Tiger Nixon'],
    ['Tiger Nixon'],
    ['Tiger Nixon'],
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();

        // Transform the JSON data to fit the DataTable format
        const transformedData = jsonData.map((item: { fullName: any; primaryEmail: any; officeRoom: any; civilTitle: any; nationality: any; officePhone: { prefix: any; localNumber: any; }; mobilePhone: { prefix: any; localNumber: any; }; }) => [
          item.fullName,
          item.primaryEmail,
          item.officeRoom,
          item.civilTitle,
          item.nationality,
          item.officePhone ? `${item.officePhone.prefix} ${item.officePhone.localNumber}` : 'N/A',
          item.mobilePhone ? `${item.mobilePhone.prefix} ${item.mobilePhone.localNumber}` : 'N/A'
        ]);

        setFetchedData(transformedData);
      } catch (err) {
        console.error('Error details:', err);
        setFetchedData([['Error fetching data: ' + err]]);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <link rel="stylesheet" href="https://cdn.datatables.net/2.3.1/css/dataTables.dataTables.css" />

      <div className="w-full p-4">
        <div className="flex flex-row space-x-10 w-full">
          <div className="flex-1">
            <DataTable data={tableData} className="display w-full">
              <thead>
                <tr>
                  <th>Status in the organization</th>
                </tr>
              </thead>
            </DataTable>
          </div>
          <div className="flex-1">
            <DataTable data={tableData} className="display w-full" options={{
              responsive: true,
              select: true,
              scrollCollapse: true
            }}>
              <thead>
                <tr>
                  <th>Status in the organization</th>
                </tr>
              </thead>
            </DataTable>
          </div>
          <div className="flex-1">
            <DataTable data={tableData} className="display w-full">
              <thead>
                <tr>
                  <th>Status in the organization</th>
                </tr>
              </thead>
            </DataTable>
          </div>
        </div>
        <div>
          <DataTable data={fetchedData} className="display w-full" options={{
            responsive: true,
            select: true,
            scrollCollapse: true
          }}>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Office Room</th>
                <th>Title</th>
                <th>Nationality</th>
                <th>Office Phone</th>
                <th>Mobile Phone</th>
              </tr>
            </thead>
          </DataTable>
        </div>
      </div>
    </>
  );
}

export default Equipe;
