import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { toast, ToastContainer } from 'react-toastify';  // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import CSS for react-toastify
import './Css/UpdateUser.css';

function UpdateUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    contact: '',
    bloodgroup: '',
  });
  const location = useLocation();
  const navigate = useNavigate(); 

  const updateUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/admin/updateUser/${location.state._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data._id) {
        toast.success("Update Successful!", {
          position: "top-center",  
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          closeButton: false,  // Disable close button
        });

        // Redirect to users list after a short delay
        setTimeout(() => {
          navigate('/users');
        }, 2000); // Delay of 2 seconds to display the success message
      } else {
        toast.error("Update Failed!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          closeButton: false,  // Disable close button
        });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error("An error occurred while updating the user", {
        position: "top-center",  
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,  // Disable close button
      });
    }
  };

  useEffect(() => {
    if (location.state) {
      setFormData(location.state); // Populate form data with user details
    }
  }, [location.state]);

  return (
    <div className="update-user-container">
      <ToastContainer />  
      <h1>Update User</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateUser();
        }}
      >
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <label>Blood Group:</label>
        <input
          type="text"
          value={formData.bloodgroup}
          onChange={(e) => setFormData({ ...formData, bloodgroup: e.target.value })}
          required
        />

        <label>Contact:</label>
        <input
          type="text"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          required
        />

        <label>Address:</label>
        <textarea
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          required
        />

        <button type="submit"><i className="fa-sharp fa-solid fa-pen"></i> Update</button>
      </form>
    </div>
  );
}

export default UpdateUser;
