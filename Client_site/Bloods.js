import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import "./CSS/Bloods.css";

const Bloods = () => {
  const [alldoners, setAllDoners] = useState([]);
  const[flag, setFlag]= useState([]);
  //const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:5000/doner/getAllDoner');
      const data = await response.json();
      setAllDoners(data);
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };

  const search = async (value) => {
    if (!value) {
      //getData();
      setFlag(0)
    } else {
      const response = await fetch(
        `http://localhost:5000/doner/searchbybloodgroup/${value}`
      );
      const data1 = await response.json();
      setAllDoners(data1);
      if(data1.length>0)
        {
            setFlag(1)
        }
       
    }
  };

  useEffect(() => {
    //getData();
  }, []);

  return (
    <div className="donerlist-containeroo" style={{marginBottom:'300px'}}>
      <h1>Donor List</h1>
      <h6 style={{marginLeft:'160px',marginBottom:'20px'}}>You should have to login as a user for making a request of your needed bloods</h6>
      <div className="search-containero">
        <input
          className="search-input"
          onChange={(e) => search(e.target.value)}
          type="search"
          placeholder="Search by address"
        />
      </div>
      
      <table className="donerlist-table">
      
      {
        flag == 1 ? 
        <>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            {/* <th>Email</th>
            <th>Password</th> */}
            <th>Address</th>
            <th>Contact</th>
            <th>Blood Group</th>
          </tr>
        </thead>
        </>
        :
        ""
      }
      

        <tbody>
          {alldoners.map((data, index) => (
            <tr key={data._id}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              {/* <td>{data.email}</td>
              <td>{data.password}</td> */}
              <td>{data.address}</td>
              <td>{data.contact}</td>
              <td>{data.bloodgroup}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bloods;
