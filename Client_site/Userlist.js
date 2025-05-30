import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FcCamera } from "react-icons/fc";
import "./CSS/Userlist.css";

const Userlist = () => {
  const [alldoners, setAllDoners] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [profileImageID, setProfileImageID] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const getData = async () => {
    const email = localStorage.getItem("loggedUser");
    const response = await fetch(
      "http://localhost:5000/user/getUserByEmail/" + email 
    );
    const data = await response.json();
    setAllDoners(data);
    setProfileImage(data[0].profileImage);
  };

  // const search = async (value) => {
  //   if (!value) {
  //     getData();
  //   } else {
  //     const response = await fetch(
  //       `http://localhost:5000/user/searchbyaddress/${value}`
  //     );
  //     const data1 = await response.json();
  //     setAllDoners(data1);
  //   }
  // };

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
        `http://localhost:5000/user/updateProfile/${id}`,
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

  const EditUser = (id) => {
    navigate("/EditUser", { state: { id: id } });
  };

  const DeleteDoner = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };

      await fetch("http://localhost:5000/user/deleteUser/" + id, requestOptions);
      alert("Deleted Successfully");
      window.location.reload();
    }
  };

  return (
    <div className="userlist-containera">
      <h1><b>User Profile</b></h1>
      {/* <div className="search-container">
        <input
          className="search-input"
          onChange={(e) => search(e.target.value)}
          type="search"
          placeholder="Search by address"
        />
      </div> */}

      <div className="userlist-cards">
        {alldoners.map((data, index) => (
          <div className="user-card" key={data._id}>
        <div className="profile-photo-sectionx">
          <label className="photo-upload-labelx">
             <img
             src={profileImage || "https://via.placeholder.com/150"}
             alt="Profile"
             className="profile-imagex"
            />
             <input
               type="file"
               accept="image/*"
               onChange={(e) => handleImageUpload(e, data._id)}
               style={{ display: "none" }}
              />
               <div className="edit-icon">
                   <FcCamera />
                </div>
            </label>
            </div>
            {/* <p><strong>#</strong> {index + 1}</p> */}
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Email:</strong> {data.email}</p>
            {/* <p><strong>Password:</strong> {data.password}</p> */}
            <p><strong>Address:</strong> {data.address}</p>
            <p><strong>Contact:</strong> {data.contact}</p>
            <p><strong>Blood Group:</strong> {data.bloodgroup}</p>
            <div className="action-buttons">
              <button className="edit-btna" onClick={() => EditUser(data._id)}>
              <i class="fa-solid fa-pen-to-square"></i> Edit
              </button>
              <button className="delete-btna" onClick={() => DeleteDoner(data._id)}>
              <i class="fa-sharp fa-solid fa-trash"></i> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Userlist;
