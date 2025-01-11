import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import './Css/DonorsList.css'; // Add a custom CSS file for styling

const DonorsList = () => {
  const [donors, setDonors] = useState([]);
  const navigate = useNavigate();

  const fetchDonors = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/getAllDoner');
      const data = await response.json();
      setDonors(data);
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };
  
  const search = async (value) => {
    try {
      if (!value) {
        fetchDonors(); // Reset to all donors if the search query is empty
      } else {
        const response = await fetch(`http://localhost:5000/admin/searchbyname/${value}`);
        const data = await response.json();
        setDonors(data);
      }
    } catch (error) {
      console.error('Error searching donors:', error);
    }
  };

  // const editDonor = (id) => {
  //   navigate('/edit-donor', { state: { id } });
  // };

  const editDonor = (id) => {
    navigate('/update-donor', { state: { id } }); // Ensure the route matches the UpdateDonor path
  };

  const deleteDonor = async (id) => {
    if (window.confirm('Are you sure you want to delete this donor?')) {
      try {
        await fetch(`http://localhost:5000/admin/donors/${id}`, { method: 'DELETE' });
        alert('Donor deleted successfully.');
        fetchDonors();
      } catch (error) {
        console.error('Error deleting donor:', error);
      }
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    <div className="donors-container">
      <h1>Donors List</h1>

      <div className="search-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search Donors"
          onChange={(e) => search(e.target.value)} // Trigger search on input change
        />
      </div>

      <table className="donors-table">
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
          {donors.map((donor, index) => (
            <tr key={donor._id}>
              <td>{index + 1}</td>
              <td>{donor.name}</td>
              <td>{donor.email}</td>
              <td>{donor.address}</td>
              <td>{donor.contact}</td>
              <td>{donor.bloodgroup}</td>
              <td>
                <button className="edit-button" onClick={() => editDonor(donor._id)}>
                <i class="fa-solid fa-pen-to-square"></i>  Edit
                </button>
                <button className="delete-button" onClick={() => deleteDonor(donor._id)}>
                <i class="fa-sharp fa-solid fa-trash"></i> Delete
                </button>
              </td>
            </tr>
          ))}
          {donors.length === 0 && (
            <tr>
              <td colSpan="7" className="no-donors">No donors found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DonorsList;
