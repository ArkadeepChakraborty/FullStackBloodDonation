import { useState, useEffect } from "react"
// import Showdataintable from "./Showdataintable"
import { Navigate, useNavigate } from 'react-router-dom';
import './App.css'
import './CSS/Usersearch.css'

function Usersearch() {

    const [alldonors, setAlldonors] = useState([])
    const [address, setAddress] = useState([])
    const [bloodgroup, setBloodgroup] = useState([])

    const navigate = useNavigate();

    const getData = async () => {
        const response = await fetch('http://localhost:5000/user/getAllUser');
        const data = await response.json();
        setAlldonors(data)
    }

    //ei part ta korchilam


    const searchbyboth = async (value) => {
        setAddress(value)

        if (value == null || value === "") {
            getData()
        }

        else {

            const byaddressandblood = {
                "address": value,
                "bloodgroup": bloodgroup
            }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(byaddressandblood)
            };

            const response = await fetch('http://localhost:5000/user/searchbyboth', requestOptions)
            const data1 = await response.json();
            setAlldonors(data1)
        }
    }



    //ei part ta korchilam
    // for blood group
    const searchbybloodgroup = async (value) => {
        setBloodgroup(value)
        if (value == null || value === "") {
            getData()
        }

        else {

            const response = await fetch(`http://localhost:5000/user/searchbybloodgroup/${value}`);
            const data1 = await response.json();
            setAlldonors(data1)
            console.log(data1);
        }
    }



    useEffect(() => {
        getData()
    }, [])


    return (
        <>
             <div style={{marginBottom:'150px'}}>
            <h2 className="h1search"><b>Online Blood Donation</b></h2>

            <table className="tablesearch">

                <tr>
                    <th className="tableheadsearch">Search User</th>
                </tr>
                
                <tr>
                    <td style={{color: 'yellow'}} ><b>Select Blood Group</b></td> <td> <select onChange={(e) => searchbybloodgroup(e.target.value)} name="" id="" title="Blood Group" className="bloodgroup">

                        <option >Select your bloodgroup</option>
                        <option value="a+">a+</option>
                        <option >A-</option>
                        <option >A+</option>
                        <option >B+</option>
                        <option >B-</option>
                        <option >o+</option>
                        <option >o-</option>

                    </select>

                    </td>
                </tr>
                <br></br>
                <tr>
                    <td style={{color: 'blue'}}><b>Enter Your Location</b>  </td> <td> <input onChange={(e) => searchbyboth(e.target.value)} type="search" placeholder="Enter Location" />
                        {/* <td>Enter Your blood group:  <input onChange={(e) => search(e.target.value)} type="search" placeholder="Enter blood group" /> */}
                    </td>
                </tr>
                <br></br>

                {/* <button className="btnone" onClick={(e) => search()}> Search </button> */}

                {/* <form >
                    <input type="search" placeholder="Search" aria-label="Search" onChange={(e) => Search(e.target.value)} />

                </form> */}


            </table>

            <br></br>

            {/* <h1 className="donorslistname" >Donor's List</h1> */}
            <div className="table-container">
  <h2><b>User's List</b></h2>
  <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        {/* <th scope="col">Email</th>
        <th scope="col">Password</th> */}
        <th scope="col">Address</th>
        <th scope="col">Contact</th>
        <th scope="col">Bloodgroup</th>
      </tr>
    </thead>
    <tbody>
      {alldonors.map((data, index) => (
        <tr key={index}>
          <th scope="row" className="table-secondary">{index + 1}</th>
          <td className="table-primary">{data.name}</td>
          {/* <td className="table-warning">{data.email}</td>
          <td className="table-success">{data.password}</td> */}
          <td className="table-danger">{data.address}</td>
          <td className="table-warning">{data.contact}</td>
          <td className="table-info">{data.bloodgroup}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>

        </>
    )
}

export default Usersearch;