import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { Link } from 'react-router-dom';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from '@mui/icons-material/Edit';

export default function UserManagement() {
  const [tableData, setTableData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Phone Number', field: 'phone' },
    { title: 'City', field: 'city' },
    { title: 'Age', field: 'age' },
  ];

  const getUserdata = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleRowDelete = (selectedRow) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`http://localhost:5000/Usermanage/delete/${selectedRow._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          fetchData();
          console.log('Row deleted successfully from backend');
        } else {
          console.log('Failed to delete row from backend');
        }

        resolve();
      } catch (error) {
        console.error('Error deleting row from backend:', error);
        reject();
      }
    });
  };

  const handleRowUpdate = (rowData, event) => {
    console.log(rowData)
    setSelectedUser(rowData);
    handleOpenPopup();
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedUser)
    try {
      const response = await fetch(`http://localhost:5000/UserManage/update/${selectedUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedUser),
      });

      if (response.status === 200) {
        console.log('Row updated successfully');
        fetchData();
        handleClosePopup();
      } else {
        console.log('Failed to update row');
      }
    } catch (error) {
      console.error('Error updating row:', error);
    }
  };

  async function fetchData() {
    const response = await fetch("http://localhost:5000/Usermanage");
    const result = await response.json();
    if (response.status === 200) {
      try {
        setTableData(result);
      } catch (err) {
        console.log("Fetch failed", err);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <section>
        {showPopup && (
          <div className="overlay">
            <div className="popup">
              <h2 className='my-3 text-2xl font-bold text-center '>Updating User</h2>
              <form onSubmit={handleUpdateSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" className='border rounded m-1 p-2' required onChange={getUserdata} value={selectedUser?.name || ''} />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" className='border rounded m-1 p-2' required onChange={getUserdata} value={selectedUser?.email || ''} />
                <label htmlFor="city">City:</label>
                <input type="text" id="city" name="city" className='border rounded m-1 p-2' required onChange={getUserdata} value={selectedUser?.city || ''} />
                <label htmlFor="phone">Phone:</label>
                <input type="number" id="phone" name="phone" pattern="[0-9]*" className='border rounded m-1 p-2' required onChange={getUserdata} value={selectedUser?.phone || ''} />
                <label htmlFor="age">Age:</label>
                <input type="number" id="age" name="age" className='border rounded m-1 p-2' required onChange={getUserdata} value={selectedUser?.age || ''} />
                <button type="submit" className='p-2 my-2 rounded  bg-blue-500 text-white'>Update</button>
              </form>
              <button onClick={handleClosePopup} className='p-2 bg-red-600 rounded text-white'>Close</button>
            </div>
          </div>
        )}
      </section>
      <MaterialTable
        columns={columns}
        data={tableData}
        title={
          <div className='font-bold text-2xl'>
            Users Information
            <Link to='/AddNewUser'>
              <ControlPointIcon className='ml-6 accordion' style={{ color: 'blue', fontSize: '2rem' }}/>
            </Link>
          </div>
        }
        options={{
          exportButton: true,
          exportAllData: true,
          addRowPosition: "first",
          actionsColumnIndex: -1,
          columnsButton: true
        }}
        editable={{
          onRowDelete: handleRowDelete,
        }}
        actions={[
          // {
          //   icon: () => <Link to='/AddNewUser' ><AddIcon /></Link>,
          //   isFreeAction: true,
          //   tooltip: "Add New User",
          // },
          {
            icon: () => <EditIcon />,
            onClick: (event, rowData) => handleRowUpdate(rowData, event),
            tooltip: "Update User",
          },
        ]}
      />
    </div>
  );
}
