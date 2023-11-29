import { Route, Routes } from 'react-router-dom';
import Dashboard from '../src/Pages/Dashboard'
import './App.css';
import Sidebar from './Components/Sidebar';
import UserManagement from "./Pages/UserManagement"
import AddNewUser from './Pages/AddNewUser';

function App() {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200  rounded-lg dark:border-gray-700">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/AddNewUser" element={<AddNewUser />} />
            <Route path="/Users" element={<UserManagement />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
