import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Userlist.css";

const Userlist = () => {
  const [alldoners, setAllDoners] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    const email = localStorage.getItem("loggedUser");
    const response = await fetch(
      "http://localhost:5000/user/getUserByEmail/" + email
    );
    const data = await response.json();
    setAllDoners(data);
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
