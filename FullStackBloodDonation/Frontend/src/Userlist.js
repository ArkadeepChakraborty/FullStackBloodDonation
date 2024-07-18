import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Userlist = () => {

  const [alldoners, setAllDoners] = useState([])
  //const[message, setMessage] = useState('')
  const navigate = useNavigate(); 

  const getData = async () =>{
    const response =  await fetch('http://localhost:5000/user/getAllUser');
    const data = await response.json()
    console.log(data)
    setAllDoners(data)
  }

  // const search = async(value) =>{
  //   if(value == null || value == "")
  //   {
  //     getData()
  //   }
  //   else
  //   {
  //     const response =await   fetch(`http://localhost:5000/user/searchbyname/${value}`);
  //     const data1 = await response.json()
  //     setAllDoners(data1)
  //     console.log(data1);
  //   }
  // }


  const search = async(value) =>{
    if(value == null || value == "")
    {
      getData()
    }
    else
    {
      const response =await   fetch(`http://localhost:5000/user/searchbyaddress/${value}`);
      const data1 = await response.json()
      setAllDoners(data1)
      console.log(data1);
    }
  }


  useEffect(()=>{
    getData()
  },[])

 
  const EditUser = (id) =>{
    navigate('/EditUser', {state: {"id":id}});
}
const DeleteDoner = async (id) =>{
      if(window.confirm('Are u sure to delete this record? '))
      {
              const requestOptions = {
                method: 'Delete',
                headers: { 'Content-Type': 'application/json' },
            };
            
            const response = await fetch('http://localhost:5000/user/deleteUser/'+id, requestOptions);
                   
           
            alert("Delete Successfully")

            window.location.reload()
           
      }
    }


  return (
    <>
      <div>

        <br/>
        
        <div>
                <div class="container-fluid">
                    <form class="d-flex">
                        <input class="form-control me-2" onChange={(e) => search(e.target.value)} type="search" placeholder="Search" aria-label="Search"/>
                        {/* <button class="btn search-btn" type="submit" onClick={filterByAddress} >Search</button> */}
                    </form>
                </div>
            </div>

      {/* <td>
        <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => search(e.target.value)} style={{marginLeft:'1325px'}}/>
        </form>
        </td> */}

        <table class="table" style={{marginLeft:'0px', marginTop:'-2px',marginBottom:'12%'}}>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Password</th>
          <th scope="col">Address</th>
          <th scope="col">Contact</th>
          <th scope="col">Bloodgroup</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
                {
                  alldoners.map((data,index) =>
                      <tr>
                        <th scope="row">{index+1}</th>
                        <td><b>{data.name}</b></td>
                        <td><b>{data.email}</b></td>
                        <td><b>{data.password}</b></td>
                        <td><b>{data.address}</b></td>
                        <td><b>{data.contact}</b></td>
                        <td><b>{data.bloodgroup}</b></td>
                        <td>
                            <button style={{margin:'7px'}} onClick={(e) => EditUser(data._id)}>Edit</button>
                            <button style={{margin:'7px'}} onClick={(e) => DeleteDoner(data._id)}>Delete</button>
                            </td>
                      </tr>
                  )
                }
      </tbody>
    </table>

    </div>
    </>
    
  )
}

export default Userlist