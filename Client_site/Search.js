import { useState, useEffect } from "react"
// import Showdataintable from "./Showdataintable"
import { Navigate, useNavigate } from 'react-router-dom';
import './App.css'

function Search() {

    const [alldonors, setAlldonors] = useState([])
    const [address, setAddress] = useState([])
    const [bloodgroup, setBloodgroup] = useState([])
    const [user_id, setuser_id] = useState('')
       const [donor_id, setdonor_id] = useState('')
       const [request_date, setrequest_date] = useState('')
       const [message, setMessage] = useState('')
    const[flag, setFlag]= useState([]);

    const navigate = useNavigate();

    const getData = async () => {
        const response = await fetch('http://localhost:5000/doner/getAlldoner');
        const data = await response.json();
        setAlldonors(data)
    }



    //ei part ta korchilam


    // const searchbyboth = async (value) => {
    //     setAddress(value)

    //     if (value == null || value === "") {
    //         getData()
    //     }

    //     else {

    //         const byaddressandblood = {
    //             "address": value,
    //             "bloodgroup": bloodgroup
    //         }

    //         const requestOptions = {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(byaddressandblood)
    //         };

    //         const response = await fetch('http://localhost:5000/doner/searchbyboth', requestOptions)
    //         const data1 = await response.json();
    //         setAlldonors(data1)
    //     }
    // }



    //ei part ta korchilam
    // for blood group
    const searchbybloodgroup = async (value) => {
        setBloodgroup(value)
        if (value == null || value === "") {
            //getData()
            setFlag(0)
        }

        else {

            const response = await fetch(`http://localhost:5000/doner/searchbybloodgroup/${value}`);
            const data1 = await response.json();
            setAlldonors(data1)
            console.log(data1);
            if(data1.length>0)
                {
                    setFlag(1)
                }
        }
        if(value=="Select your bloodgroup"){
            setFlag(0)
        }
    }



    useEffect(() => {

        const uid = localStorage.getItem('user_id')
        setuser_id(uid)
       // getData()
    }, [])

 const getCurrentDate=()=>{
    const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const currentDate = getCurrentDate();

    const requestBlood = async (donor_id) =>{

        const new_request =  {
            "user_id": user_id,
            "donor_id": donor_id,
            "request_date": request_date
        }

        console.log(new_request)
        const requestoptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_request)
        };


        const responses= await fetch('http://localhost:5000/request/checkRequest', requestoptions)
        const data = await responses.json()
        if(data.length==0){
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_request)
        };

        const response = await fetch('http://localhost:5000/request/addRequest', requestOptions);
        if(!response){
            console.log("Error")
        }
        else{
            console.log(response)
        }
        const data = await response.json();

        if(data._id!=null)
        {
            setMessage("Done")
            window.location.href = "/request1"
        }
        else
        {
            setMessage("Not done")
        }
        
    }
else{
    alert("Already requested")
}
    }


    return (
        <>
            <div style={{marginBottom:'270px'}}>
            <h2 className="h1search"><b>Online Blood Donation</b></h2>

            <table className="tablesearch">

                <tr>
                    <th className="tableheadsearch">Search Donor</th>
                </tr>
                
                <tr>
                    <td style={{color: 'yellow'}} ><b>Select Blood Group</b></td> <td> <select onChange={(e) => searchbybloodgroup(e.target.value)} name="" id="" title="Blood Group" className="bloodgroup">

                        <option>Select your bloodgroup</option>
                        <option >A+</option>
                        <option >B+</option>
                        <option >AB</option>
                        <option >O</option>

                    </select>

                    </td>
                </tr>

            </table>

            <br></br>

            {/* <h1 className="donorslistname" >Donor's List</h1> */}
            <h2><b>Donor's List</b></h2>


            <table class="table" style={{marginLeft:'150px', marginTop:'-2px',marginBottom:'8%'}}>
            {
        flag == 1 ? 
        <>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          {/* <th scope="col">Email</th>
          <th scope="col">Password</th> */}
          <th scope="col">Address</th>
          <th scope="col">Contact</th>
          <th scope="col">Bloodgroup</th>
          <th scope="col">Date</th>
           <th scope="col">Action</th>
        </tr>
      </thead>
      </>
      :
     <b style={{marginLeft:'515px'}}>No Donors Found</b>
}
      <tbody >
                    {
                        alldonors.map((data, index) =>

                            <tr >

                                <th scope="row" class="table-secondary">{index + 1}</th>

                                <td class="table-primary" >{data.name}</td>

                                {/* <td class="table-warning" >{data.email}</td>

                                <td class="table-success">{data.password}</td> */}

                                <td class="table-danger">{data.address}</td>

                                <td class="table-warning">{data.contact}</td>

                                <td class="table-info">{data.bloodgroup}</td>

                                <td class="table-info"><input type="date" onChange={(e) => setrequest_date(e.target.value)} min={currentDate}></input></td>

                                <td class="table-success">
                                        <button className="edit-btn" onClick= {(e) => requestBlood(data._id)}>
                                        Request
                                        </button>
                                </td>

                            </tr>

                        )
                    }

                </tbody>

    </table>
{message}
    </div>
        </>
    )
}

export default Search;