// import React from 'react'

// const Profile = () => {
//   return (
//     <>
//         <div className="container-fluid">
//             <div className="card">
//                 <div className="card-body">
//                 <h5 className="card-title fw-semibold mb-4">Profile Page</h5>
//                 <p className="mb-0">This is a Profile page </p>
//                 </div>
//             </div>
//             <div className="py-6 px-6 text-center">
//                 <p className="mb-0 fs-4">Design and Developed by MERN34</p>
//             </div>
//         </div>
//     </>
//   )
// }

// export default Profile


import React, { useState } from 'react';
import './Css/Profile.css'; // Add styling

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    password: '',
  });

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        // Store the registration data in localStorage or another state management solution
        localStorage.setItem('adminData', JSON.stringify(formData));
        // Redirect to the Profile View after registration
        window.location.href = '/profile-view';
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error registering admin:', error);
    }
  };

  return (
    <div className="register-container">
      <h1>Admin Registration</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your name"
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="phone_number">Phone Number:</label>
        <input
          type="text"
          id="phone_number"
          value={formData.phone_number}
          onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
          placeholder="Enter your phone number"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Enter your password"
          required
        />

        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default Profile;
