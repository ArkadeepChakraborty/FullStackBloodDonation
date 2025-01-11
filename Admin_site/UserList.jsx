import React, { useEffect, useState } from 'react';
import './Css/UsersList.css'; // Link the new CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Topbar from './Topbar';
import Sidebar from './Sidebar';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/getAllUser');
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Handle delete user functionality
  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await fetch(`http://localhost:5000/admin/users/${id}`, { method: 'DELETE' });
        alert('User deleted successfully.');
        fetchUsers(); // Refresh the users list
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  // Fetch users when the component is mounted
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='UsersList'>
      <h1 className='margin'>Users List</h1>
      <div className="search-container">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
          className="search-input"
          placeholder="Search users by name"
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Blood Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) =>
              user.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.contact}</td>
                <td>{user.bloodgroup}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => navigate('/updateUser', { state: user })}
                  >
                  <i class="fa-solid fa-pen-to-square"></i>  Edit
                  </button>
                  <button className="delete-btn" onClick={() => deleteUser(user._id)}>
                  <i class="fa-sharp fa-solid fa-trash"></i>  Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
