import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import "./CSS/Requestlist.css";
import "./CSS/DonorRequestlist.css";

const DonorRequestlist = () => {
  const [requests, setAllRequests] = useState([]);
  //const navigate = useNavigate();

  const getData = async () => {
    const donor_id = localStorage.getItem("donor_id");
    console.log(donor_id);
    const response = await fetch(
      "http://localhost:5000/request/getRequestbydonorId/" + donor_id
    );
    const data = await response.json();
    console.log("Fetched Data:", data); // Debugging: Check API response
    setAllRequests(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const UpdateRequestStatusR = async (id) => {
    if (window.confirm("Are you sure you want to reject?")) {
      const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Reject" }),
      };

      await fetch(
        "http://localhost:5000/request/updateRequestStatus/" + id,
        requestOptions
      );
      alert("Request Rejected");
      window.location.reload();
    }
  };

  const UpdateRequestStatus = async (id) => {
    if (window.confirm("Are you sure you want to accept?")) {
      const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Accept" }),
      };

      await fetch(
        "http://localhost:5000/request/updateRequestStatus/" + id,
        requestOptions
      );

      //get the donor id and donate date from request schema

      //update donated date in donor schema


      alert("Request Accepted");
      window.location.reload();
    }
  };

  return (
    <div className="userlist-container" style={{ marginBottom: "250px" }}>
      <h1>Request List</h1>
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
                  {data.status === "Pending" ? (
                    <>
                      <button
                        className="it-btn"
                        onClick={() => UpdateRequestStatus(data.reqid)}
                      >
                        <TiTick /> Accept
                      </button>
                      <button
                        className="ete-btn"
                        onClick={() => UpdateRequestStatusR(data.reqid)}
                      >
                        <RxCross1 /> Reject
                      </button>
                    </>
                  ) : data.status === "Accept" ? (
                    <span>Request Accepted</span>
                  ) : (
                    <span>Request Rejected</span>
                  )}
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

export default DonorRequestlist;
