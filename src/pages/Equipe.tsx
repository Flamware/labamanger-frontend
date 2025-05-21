import { useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-select-dt';


DataTable.use(DT);

function Equipe() {
  // Demo data
  const [tableData] = useState<
    Array<[string]>
  >([
    [
      'Tiger Nixon',
    ],[
      'Tiger Nixon',
    ],[
      'Tiger Nixon',
    ],[
      'Tiger Nixon',
    ],[
      'Tiger Nixon',
    ],[
      'Tiger Nixon',
    ],[
      'Tiger Nixon',
    ],[
      'Tiger Nixon',
    ],[
      'Tiger Nixon',
    ],[
      'Tiger Nixon',
    ],[
      'Tiger Nixon',
    ],[
      'Tiger Nixon',
    ],[
      'Tiger Nixon',
    ],[
      'Tiger Nixon',
    ],

  ]);

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
    </div>

    </>
  );
}

export default Equipe;
