// import React from 'react'

// const Users = () => {
//   return (
//     <>
//         <div className="container-fluid">
//             <div className="card">
//                 <div className="card-body">
//                 <h5 className="card-title fw-semibold mb-4">Users Page</h5>
//                 <p className="mb-0">This is a Users page </p>
//                 </div>
//             </div>
//             <div className="py-6 px-6 text-center">
//                 <p className="mb-0 fs-4">Design and Developed by MERN34</p>
//             </div>
//         </div>
//     </>
//   )
// }

// export default Users


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('/api/admin/users');
      setUsers(res.data);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4">Users</h5>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => handleDelete(user._id)}>Delete</button>
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

export default Users;



