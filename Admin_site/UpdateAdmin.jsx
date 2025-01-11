import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Css/UpdateAdmin.css';

function UpdateAdmin() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    role: '',
  });

  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const location = useLocation();
  const navigate = useNavigate();

  // Update Admin Details
  const handleUpdate = async () => {
    const { _id } = location.state;

    try {
      const response = await fetch(`http://localhost:5000/admin/updateAdmin/${_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data._id) {
        setMessage('Admin updated successfully!');
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        setMessage('Failed to update admin.');
      }
    } catch (error) {
      console.error('Error updating admin:', error);
      setMessage('An error occurred.');
    } finally {
      setShowModal(false); // Hide modal after update attempt
    }
  };

  // Populate form data on component mount
  useEffect(() => {
    if (location.state) {
      const { name, email, phone_number, role } = location.state;
      setFormData({ name, email, phone_number, role });
    }
  }, [location.state]);

  return (
    <div className="update-container">
      <h1>Update Admin</h1>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter admin name"
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter admin email"
          required
        />

        <label htmlFor="phone_number">Phone Number:</label>
        <input
          type="text"
          id="phone_number"
          value={formData.phone_number}
          onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
          placeholder="Enter phone number"
          required
        />

        <label htmlFor="role">Role:</label>
        <input
          type="text"
          id="role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          placeholder="Enter role (e.g., Admin, Manager)"
        />

        <button
          type="button"
          className="update-buttono"
          onClick={() => setShowModal(true)} // Show modal on click
        >
          <i className="fa-sharp fa-solid fa-pen"></i> Update
        </button>
      </form>
      <p>{message}</p>

      {/* Modal */}
      {showModal && (
        <div className="modal" tabindex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Update</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure to make the changes?</p>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  No
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateAdmin;
