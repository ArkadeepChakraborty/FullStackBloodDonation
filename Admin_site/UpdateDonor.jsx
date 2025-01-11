import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';  // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import CSS for react-toastify
import './Css/UpdateDonor.css'; // Custom CSS file

function UpdateDonor() {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [bloodgroup, setBloodgroup] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const updateDonor = async () => {
    const updatedDonor = {
      name,
      email,
      address,
      contact,
      bloodgroup,
    };

    try {
      const response = await fetch(`http://localhost:5000/admin/updateDoner/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedDonor),
      });

      const data = await response.json();

      if (data._id != null) {
        toast.success("Update Successful!", {
          position: "top-center",  // Correct position
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          closeButton: false,  // Disable close button
        });

        // Redirect to donor list after 3 seconds
        setTimeout(() => {
          navigate('/donors');
        }, 3000);
      } else {
        toast.error("Update Failed!", {
          position: "top-center",  // Correct position
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
      console.error('Error updating donor:', error);
      toast.error("Error updating donor.", {
        position: "top-center",  // Correct position
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
    const { id } = location.state || {};
    if (id) {
      setId(id);
      fetchDonorDetails(id);
    }
  }, [location.state]);

  const fetchDonorDetails = async (donorId) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/getDonerById/${donorId}`);
      const data = await response.json();
      setName(data.name);
      setEmail(data.email);
      setBloodgroup(data.bloodgroup);
      setAddress(data.address);
      setContact(data.contact);
    } catch (error) {
      console.error('Error fetching donor details:', error);
    }
  };

  return (
    <div className="update-donor-container">
      <ToastContainer />  
      <h1>Update Donor</h1>
      <form>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter donor name"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter donor email"
          />
        </div>

        <div className="form-group">
          <label>Blood Group</label>
          <input
            type="text"
            value={bloodgroup}
            onChange={(e) => setBloodgroup(e.target.value)}
            placeholder="Enter blood group"
          />
        </div>

        <div className="form-group">
          <label>Contact</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter contact number"
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter donor address"
          />
        </div>

        <div className="form-group">
          <button type="button" onClick={updateDonor}>
            <i className="fa-sharp fa-solid fa-pen"></i> Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateDonor;
