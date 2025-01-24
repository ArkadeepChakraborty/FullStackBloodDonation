import React, { useState, useEffect } from "react";
import "./Css/RequestList.css";

function RequestList() {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState("");

    // Fetch all request details
    const fetchRequests = async () => {
        try {
            const response = await fetch("http://localhost:5000/admin/getAllRequest");
            const data = await response.json();

            if (response.ok) {
                setRequests(data);
            } else {
                setError(data.message || "Failed to fetch request details");
            }
        } catch (err) {
            setError("An error occurred while fetching data");
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div className="request-list-containerb">
            <h1>All Requests</h1>
            {error && <div className="error-message">{error}</div>}
            {requests.length > 0 ? (
                <table className="request-tableo">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Donor Name</th>
                            <th>Request Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request._id}>
                                <td>{request.uname || "Unknown User"}</td>
                                <td>{request.dname || "Unknown Donor"}</td>
                                <td>{request.request_date}</td>
                                <td>{request.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !error && <div className="loading-message">Loading...</div>
            )}
        </div>
    );
}

export default RequestList;
