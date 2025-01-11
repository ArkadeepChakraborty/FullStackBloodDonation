import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import "./CSS/Requestlist.css";

const Requestlist = () => {
  const [requests, setAllRequests] = useState([]);
  //const navigate = useNavigate();

  const getData = async () => {
    
      const user_id = localStorage.getItem("user_id");
      const response = await fetch(
        "http://localhost:5000/request/getRequestbyuserId/" + user_id
      );
      const data = await response.json();
      console.log("Fetched Data:", data); // Debugging: Check API response
      setAllRequests(data); 
  };

  useEffect(() => {
    getData();
  }, []);


  //   const search = async (value) => {
  //   if (!value) {
  //     getData();
  //   } else {
  //     const response = await fetch(
  //       `http://localhost:5000/request/searchbybloodgroup/${value}`
  //     );
  //     const data = await response.json();
  //     setAllRequests(data);
  //   }
  // };

    const DeleteRequest = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };

      await fetch("http://localhost:5000/request/deleteRequest/" + id, requestOptions);
      alert("Deleted Successfully");
      window.location.reload();
    }
  };

  return (
    <div className="userlist-container" style={{ marginBottom: "250px" }}>
      <h1>Request List</h1>
      {/* <div className="search-container">
        <input
          className="search-input"
          onChange={(e) => search(e.target.value)}
          type="search"
          placeholder="Search by Bloodgroup"
        />
      </div> */}
      <table className="userlist-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Blood Group</th>
            <th>Request Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((data, index) => (
              <tr key={data._id}>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.address}</td>
                <td>{data.contact}</td>
                <td>{data.bloodgroup}</td>
                <td>{data.request_date}</td>
                <td>{data.status}</td>
                <td>
                  <button className="Cancel-btn" onClick={() => DeleteRequest(data._id)}>
                  <i class="fa-sharp fa-solid fa-trash"></i>
                    </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No requests found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Requestlist;





//   const search = async (value) => {
//     if (!value) {
//       getData();
//     } else {
//       const response = await fetch(
//         `http://localhost:5000/user/searchbyaddress/${value}`
//       );
//       const data1 = await response.json();
//       setAllDoners(data1);
//     }
//   };


//   const DeleteDoner = async (id) => {
//     if (window.confirm("Are you sure you want to delete this record?")) {
//       const requestOptions = {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//       };

//       await fetch("http://localhost:5000/user/deleteUser/" + id, requestOptions);
//       alert("Deleted Successfully");
//       window.location.reload();
//     }
//   };