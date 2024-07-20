import { useState, useEffect } from "react"
// import Showdataintable from "./Showdataintable"
import { Navigate, useNavigate } from 'react-router-dom';
import './App.css'

function Search() {

    const [alldonors, setAlldonors] = useState([])
    const [address, setAddress] = useState([])
    const [bloodgroup, setBloodgroup] = useState([])

    const navigate = useNavigate();

    const getData = async () => {
        const response = await fetch('http://localhost:5000/doner/getAlldoner');
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

            const response = await fetch('http://localhost:5000/doner/searchbyboth', requestOptions)
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

            const response = await fetch(`http://localhost:5000/doner/searchbybloodgroup/${value}`);
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

            <h2 className="h1search"><b>Online Blood Donation</b></h2>

            <table className="tablesearch">

                <tr>
                    <th className="tableheadsearch">Search Donor</th>
                </tr>
                
                <tr>
                    <td style={{color: 'blue'}} ><b>Select Blood Group</b></td> <td> <select onChange={(e) => searchbybloodgroup(e.target.value)} name="" id="" title="Blood Group" className="bloodgroup">

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
            <h2><b>Donor's List</b></h2>


            <table class="table" style={{marginLeft:'0px', marginTop:'-2px',marginBottom:'8%'}}>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Password</th>
          <th scope="col">Address</th>
          <th scope="col">Contact</th>
          <th scope="col">Bloodgroup</th>
          {/* <th scope="col">Action</th> */}
        </tr>
      </thead>
      <tbody >
                    {
                        alldonors.map((data, index) =>

                            <tr >

                                <th scope="row" class="table-secondary">{index + 1}</th>

                                <td class="table-primary" >{data.name}</td>

                                <td class="table-warning" >{data.email}</td>

                                <td class="table-success">{data.password}</td>

                                <td class="table-danger">{data.address}</td>

                                <td class="table-warning">{data.contact}</td>

                                <td class="table-info">{data.bloodgroup}</td>

                            </tr>

                        )
                    }

                </tbody>

    </table>


        </>
    )
}

export default Search;