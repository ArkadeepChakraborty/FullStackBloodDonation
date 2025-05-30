// import React, { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom';
// // import { useNavigate } from 'react-router-dom';
// import './App.css'

// function BDEdit(){

//     const [id, setId] = useState('')
//     const [email, setEmail] = useState('')
//     const [name, setName] = useState('')
//     const [bloodgroup, setBloodgroup] = useState('')
//     const [address, setAddress] = useState('')
//     // const [password, setpassword] = useState('')
//     // const [gender, setGender] = useState('')
//     const[contact, setcontact] = useState('')
//     const[message, setMessage] = useState('')

//     const location = useLocation();
//     // const navigate = useNavigate();

//     const update = async () =>{
//         const new_donor =  {
//             "name": name,
//             "email": email,
//             // "password": password,
//             "address": address,
//             "contact": contact,
//             "bloodgroup": bloodgroup
//         }

//         const requestOptions = {
//             method: 'PATCH',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(new_donor)
//         };

//         const response = await fetch(`http://localhost:5000/doner/updateDoner/${id}`, requestOptions);
//         const data = await response.json();

//         if(data._id!=null)
//         {
//             setMessage("Update Successfully")
//         }
//         else
//         {
//             setMessage("Update Failed")
//         }
//     }

       

//         const getDatabyId = async (id) =>{
//             const response = await fetch('http://localhost:5000/doner/getDonerById/'+id);
//             const data = await response.json();
//             console.log(37, data)
//             setName(data.name);
//             setEmail(data.email);
//             // setpassword(data.password);
//             setAddress(data.address);
//             setcontact(data.contact);
//             setBloodgroup(data.bloodgroup);
//         }

//         useEffect(() =>{
//             const id = location.state.id;
//             console.log(48, id)
//             setId(id)
//             getDatabyId(id)
//          },[])

//     
//     return(
//         <>

//         <table>
//             <tr>
//                 <th style={{color: 'black'}}>Edit Your Profile</th>
//             </tr>
//              <tr>
//                 <td>Enter Your Name</td>
//                 <td><input type="text" name="" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} value={name}/></td>
//             </tr>
//             <tr>
//                 <td>Enter Email Id</td>
//                 <td ><input type="email" name="" placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)} value={email}/></td>
//             </tr> 
//             <tr>
//                 <td>Enter Blood group</td>
//                 <td><input type="name" name="" placeholder="Enter Blood group" onChange={(e) => setBloodgroup(e.target.value)} value={bloodgroup}/></td>
//             </tr>
//             <tr>
//                 <td>Enter your contact no</td>
//                 <td><input type="number" name="" placeholder="Enter your contact no" onChange={(e) => setcontact(e.target.value)} value={contact}/></td>
//             </tr>
//             <tr>
//                 <td>Enter Your Address</td>
//                 <td><textarea type="text" name="" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)} value={address}/></td>
//             </tr>
            
//             <tr>
//                 <td><input onClick= {update} type="Submit" value="Update"/></td>
//             </tr>
    
//             <tr>
//                 <td>{message}</td>
//             </tr>
    
//         </table>

//         </>
//     )
// }

// export default BDEdit



import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import './App.css';

function BDEdit() {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [bloodgroup, setBloodgroup] = useState('');
  const [address, setAddress] = useState('');
  // const [password, setpassword] = useState('');
  // const [gender, setGender] = useState('');
  const [contact, setcontact] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // For modal visibility

  const location = useLocation();
  // const navigate = useNavigate();

  const update = async () => {
    const new_donor = {
      name: name,
      email: email,
      // password: password,
      address: address,
      contact: contact,
      bloodgroup: bloodgroup,
    };

    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(new_donor),
    };

    const response = await fetch(`http://localhost:5000/doner/updateDoner/${id}`, requestOptions);
    const data = await response.json();

    if (data._id != null) {
      setMessage('Update Successfully');
      window.location.href='/list';
    } else {
      setMessage('Update Failed');
    }
    setShowModal(false); // Close modal after updating
  };

  const getDatabyId = async (id) => {
    const response = await fetch('http://localhost:5000/doner/getDonerById/' + id);
    const data = await response.json();
    setName(data.name);
    setEmail(data.email);
    // setpassword(data.password);
    setAddress(data.address);
    setcontact(data.contact);
    setBloodgroup(data.bloodgroup);
  };

  useEffect(() => {
    const id = location.state.id;
    setId(id);
    getDatabyId(id);
  }, []);

  return (
    <>
      <table>
        <tr>
          <th style={{ color: 'black' }}>Edit Your Profile</th>
        </tr>
        <tr>
          <td>Enter Your Name</td>
          <td>
            <input
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </td>
        </tr>
        <tr>
          <td>Enter Email Id</td>
          <td>
            <input
              type="email"
              placeholder="Enter Email Id"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </td>
        </tr>
        <tr>
          <td>Enter Blood group</td>
          <td>
            <input
              type="text"
              placeholder="Enter Blood group"
              onChange={(e) => setBloodgroup(e.target.value)}
              value={bloodgroup}
            />
          </td>
        </tr>
        <tr>
          <td>Enter your contact no</td>
          <td>
            <input
              type="number"
              placeholder="Enter your contact no"
              onChange={(e) => setcontact(e.target.value)}
              value={contact}
            />
          </td>
        </tr>
        <tr>
          <td>Enter Your Address</td>
          <td>
            <textarea
              placeholder="Enter Address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </td>
        </tr>
        <tr>
          <td>
            <input
              type="button"
              value="Update"
              onClick={() => setShowModal(true)} // Show modal on click
            />
          </td>
        </tr>
        <tr>
          <td>{message}</td>
        </tr>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Update</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to apply these changes?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={update}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BDEdit;
