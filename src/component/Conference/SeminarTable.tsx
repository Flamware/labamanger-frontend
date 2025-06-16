import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-select-dt';

DataTable.use(DT);

function SeminarTable () {

    //const [data, setData] =
    const data = 
     [{
        id: 0,
        name: 'Creola Katherine Johnson',
        profession: 'mathematician',
        accomplishment: 'spaceflight calculations',
      }, {
        id: 1,
        name: 'Mario José Molina-Pasquel Henríquez',
        profession: 'chemist',
        accomplishment: 'discovery of Arctic ozone hole',
      }, {
        id: 2,
        name: 'Mohammad Abdus Salam',
        profession: 'physicist',
        accomplishment: 'electromagnetism theory',
      }, {
        id: 3,
        name: 'Percy Lavon Julian',
        profession: 'chemist',
        accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
      }, {
        id: 4,
        name: 'Subrahmanyan Chandrasekhar',
        profession: 'astrophysicist',
        accomplishment: 'white dwarf star mass calculations',
      }];



      const columns = [
        { data: 'id', title: 'Date'},
        { data: 'name', title: 'Hour' },
        { data: 'profession', title: 'Room' },
        { data: 'accomplishment', title: 'Details' },
    
      ];

    return ( 
        <div>
            <link rel="stylesheet" href="https://cdn.datatables.net/2.3.1/css/dataTables.dataTables.css" />
        <DataTable data={data} columns={columns} className="display">
          <thead>
            <tr>
                <th>Date</th>
                <th>Hour</th>
                <th>Room</th>
                <th>Details</th>


            </tr>
          </thead>
        </DataTable>
        </div>

    )
}

export default SeminarTable;