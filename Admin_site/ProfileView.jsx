import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Css/ProfileView.css";
import { FcCamera } from "react-icons/fc";

const ProfileView = () => {
  const [allAdmins, setAllAdmins] = useState([]);
  const [message, setMessage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImageID, setProfileImageID] = useState("");
  const [adminToDelete, setAdminToDelete] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const getData = async () => {
    const response = await fetch("http://localhost:5000/admin/getAllAdmins");
    const data = await response.json();
    setAllAdmins(data);
    setProfileImage(data[0].profileImage);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleImageUpload = async (e, id) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "x7wwowch");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/daxso3uk9/image/upload`,
        formData
      );

      setProfileImage(res.data.secure_url);
      setProfileImageID(res.data.public_id);

      const product = {
        profileImage: res.data.secure_url,
        profileImageID: res.data.public_id,
      };

      const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      };

      const response = await fetch(
        `http://localhost:5000/admin/updateProfile/${id}`,
        requestOptions
      );
      const data = await response.json();

      if (data._id != null) {
        setMessage("Uploaded Successfully");
      } else {
        setMessage("Failed");
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const EditAdmin = (admin) => {
    navigate("/EditAdmin", { state: admin });
  };

  const handleDeleteAdmin = async () => {
    if (adminToDelete) {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };

      await fetch(
        `http://localhost:5000/admin/deleteAdmin/${adminToDelete}`,
        requestOptions
      );
      alert("Deleted Successfully");
      setAdminToDelete(null);
      window.location.reload();
    }
  };

  return (
    <div className="adminlist-container">
      <h1>Admin Details</h1>

      <div className="adminlist-grid">
        {allAdmins.map((admin) => (
          <div className="admin-card" key={admin._id}>
            <div className="profile-photo-section">
              <label className="photo-upload-label">
                <img
                  src={profileImage || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="profile-image"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, admin._id)}
                  style={{ display: "none" }}
                />
                <div className="edit-icon">
                  <FcCamera />
                </div>
              </label>
            </div>

            <h2 className="greeting-text">Hi, {admin.name}!</h2>
            <p style={{ color: "blueviolet" }}>Email: {admin.email}</p>
            <p style={{ color: "blueviolet" }}>Phone: {admin.phone_number}</p>
            <p style={{ color: "blueviolet" }}>Role: {admin.role}</p>

            <div className="admin-actions">
              <button
                className="edit-btn"
                style={{ color: "black" }}
                onClick={() => EditAdmin(admin)}
              >
                <i className="fa-solid fa-pen-to-square"></i> Edit
              </button>
              <button
                className="delete-btn"
                style={{ color: "black" }}
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
                onClick={() => setAdminToDelete(admin._id)}
              >
                <i className="fa-sharp fa-solid fa-trash"></i> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Confirm Deletion
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this admin?</p>
            </div>
            <div className="modal-footer justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteAdmin}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;




// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Css/ProfileView.css";

// const ProfileView = () => {
//   const [allAdmins, setAllAdmins] = useState([]);
//   const navigate = useNavigate();

//   const getData = async () => {
//     // Fetch the list of admins from the backend
//     const response = await fetch("http://localhost:5000/admin/getAllAdmins");
//     const data = await response.json();
//     setAllAdmins(data);
//   };

//   useEffect(() => {
//     getData(); // Fetch data when the component is mounted
//   }, []);

//   const EditAdmin = (admin) => {
//     // Navigate to the EditAdmin page with admin details passed in state
//     navigate("/EditAdmin", { state: admin });
//   };

//   const DeleteAdmin = async (id) => {
//     if (window.confirm("Are you sure you want to delete this record?")) {
//       const requestOptions = {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//       };

//       await fetch(`http://localhost:5000/admin/deleteAdmin/${id}`, requestOptions);
//       alert("Deleted Successfully");
//       window.location.reload(); // Reload the page to reflect changes
//     }
//   };

//   return (
//     <div className="adminlist-container">
//       <h1>Admin Details</h1>

//       <div className="adminlist-grid">
//         {allAdmins.map((admin) => (
//           <div className="admin-card" key={admin._id}>
//             <h3 style={{ marginLeft: '50px' }}>{admin.name}</h3>
//             <p style={{ color: 'blueviolet' }}>Email: {admin.email}</p>
//             <p style={{ color: 'blueviolet' }}>Phone: {admin.phone_number}</p>
//             <p style={{ color: 'blueviolet' }}>Role: {admin.role}</p>
//             <div className="admin-actions">
//               <button
//                 className="edit-btn"
//                 style={{ color: 'black' }}
//                 onClick={() => EditAdmin(admin)}
//               >
//               <i class="fa-solid fa-pen-to-square"></i>  Edit
//               </button>
//               <button
//                 className="delete-btn"
//                 style={{ color: 'black' }}
//                 onClick={() => DeleteAdmin(admin._id)}
//               >
//               <i class="fa-sharp fa-solid fa-trash"></i>  Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProfileView;


// import React, { useEffect, useState } from "react";
// import { useLocation,useNavigate } from "react-router-dom";
// import axios from 'axios';
// import "./Css/ProfileView.css";
// import { FcCamera } from "react-icons/fc";

// const ProfileView = () => {
//   const [allAdmins, setAllAdmins] = useState([]);
//   // const [selectedFile, setSelectedFile] = useState(null);
//   const [message, setMessage] = useState('')
//   const [profileImage, setprofileImage] = useState('')
//   const [profileImageID, setprofileImageID] = useState('')
//   const location = useLocation();

//   const navigate = useNavigate();

//   const getData = async () => {
//     const response = await fetch("http://localhost:5000/admin/getAllAdmins");
//     const data = await response.json();
//     setAllAdmins(data);
//     setprofileImage(data[0].profileImage)
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const handleImageUpload = async (e, id) => {
//     //const { _id } = location.state;
//     const file = e.target.files[0];

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'x7wwowch'); // Replace 'your_upload_preset' with your actual upload preset

//     try {
//       const res = await axios.post(
//         `https://api.cloudinary.com/v1_1/daxso3uk9/image/upload`,
//         formData
//       );

//       console.log("188 response: ", res.data)

//       setprofileImage(res.data.secure_url);
//       setprofileImageID(res.data.public_id);

//       const product = {
//             "profileImage": res.data.secure_url,
//             "profileImageID": res.data.public_id
//         }
      
//         console.log(product)
      
        
//         const requestOptions = {
//             method: 'PATCH',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(product)
//         };
      
//         const response = await fetch(`http://localhost:5000/admin/updateProfile/${id}`, requestOptions);
//         const data = await response.json();
      
//         if(data._id!=null)
//         {
//             setMessage("Uploaded Successfully")
//         }
//         else{
//             setMessage("Failed")
//         }
      

//     } catch (error) {
//       console.error('Error uploading image: ', error);
//     }
  
//   };

//   const EditAdmin = (admin) => {
//     navigate("/EditAdmin", { state: admin });
//   };

//   const DeleteAdmin = async (id) => {
//     if (window.confirm("Are you sure you want to delete this record?")) {
//       const requestOptions = {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//       };

//       await fetch(`http://localhost:5000/admin/deleteAdmin/${id}`, requestOptions);
//       alert("Deleted Successfully");
//       window.location.reload();
//     }
//   };

//   return (
//     <div className="adminlist-container">
//       <h1>Admin Details</h1>

//       <div className="adminlist-grid">
//         {allAdmins.map((admin) => (
//           <div className="admin-card" key={admin._id}>
//             {/* Profile Image Section */}
//             <div className="profile-photo-section">
//               <label className="photo-upload-label">
//                 <img
//                   src={
//                     profileImage || "https://via.placeholder.com/150"
//                   }
//                   alt="Profile"
//                   className="profile-image"
//                 />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleImageUpload(e, admin._id)}
//                   style={{ display: "none" }}
//                 />
//                 <div 
//                   className="edit-icon"
//                    ><FcCamera/></div>
//               </label>
//             </div>

//             {/* Greeting and Details */}
//             <h2 className="greeting-text">Hi, {admin.name}!</h2>
//             <p style={{ color: "blueviolet" }}>Email: {admin.email}</p>
//             <p style={{ color: "blueviolet" }}>Phone: {admin.phone_number}</p>
//             <p style={{ color: "blueviolet" }}>Role: {admin.role}</p>

//             {/* Action Buttons */}
//             <div className="admin-actions">
//               <button
//                 className="edit-btn"
//                 style={{ color: "black" }}
//                 onClick={() => EditAdmin(admin)}
//               >
//                 <i className="fa-solid fa-pen-to-square"></i> Edit
//               </button>
//               <button
//                 className="delete-btn"
//                 style={{ color: "black" }}
//                 onClick={() => DeleteAdmin(admin._id)}
//               >
//                 <i className="fa-sharp fa-solid fa-trash"></i> Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProfileView;


