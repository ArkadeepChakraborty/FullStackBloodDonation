import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Doners = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const fetchDonors = async () => {
      const res = await axios.get('/api/admin/donors');
      setDonors(res.data);
    };

    fetchDonors();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/donors/${id}`);
      setDonors(donors.filter(donor => donor._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4">Donors</h5>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Blood Group</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr key={donor._id}>
                  <td>{donor.name}</td>
                  <td>{donor.bloodgroup}</td>
                  <td>
                    <button onClick={() => handleDelete(donor._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Doners;
