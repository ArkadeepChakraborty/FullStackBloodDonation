import { useState } from "react"
import './App.css'

function DonerUserRegistration(){

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [bloodgroup, setBloodgroup] = useState('')
    const [address, setAddress] = useState('')
    const [password, setpassword] = useState('')
    // const [gender, setGender] = useState('')
    const[contact, setcontact] = useState('')
    const[message, setMessage] = useState('')

    const register = async () =>{
        const new_donor =  {
            "name": name,
            "email": email,
            "password": password,
            "address": address,
            "contact": contact,
            "bloodgroup": bloodgroup
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_donor)
        };

        const response = await fetch('http://localhost:5000/doner/registerDoner', requestOptions);
        const data = await response.json();

        if(data._id!=null)
        {
            setMessage("Registration Successfully")
            window.location.href = "/doner"
        }
        else
        {
            setMessage("Registration Failed")
        }
    }
    return(
        <>

        <table>
            <tr>
                <th style={{color: 'red'}}>Doner's Registration</th>
            </tr>
             <tr>
                <td>Enter Your Name</td>
                <td><input type="text" name="" placeholder="Enter Name" onChange={(e) => setName(e.target.value)}/></td>
            </tr>
            <tr>
                <td>Enter Email Id</td>
                <td ><input type="email" name="" placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)}/></td>
            </tr> 
            <tr>
                <td>Enter Blood group</td>
                <td><input type="name" name="" placeholder="Enter Blood group" onChange={(e) => setBloodgroup(e.target.value)}/></td>
            </tr>
            <tr>
                <td>Enter your contact no</td>
                <td><input type="number" name="" placeholder="Enter your contact no" onChange={(e) => setcontact(e.target.value)}/></td>
            </tr>
            <tr>
                <td>Enter Your Address</td>
                <td><textarea type="text" name="" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)}/></td>
            </tr>
            <tr>
                <td>Enter password</td>
                <td><input type="password" name="" placeholder="Enter password" onChange={(e) => setpassword(e.target.value)}/></td>
            </tr>

            {/* <tr>
                <td>Select Gender</td>
                <td>
                    <input type="radio" name="" onChange={(e) => setGender(e.target.value)}></input>Male
                    <input type="radio" name="" onChange={(e) => setGender(e.target.value)}></input>Female
                </td>
            </tr> */}
             
            
            <tr>
                <td><input onClick= {register} type="Submit" value="Register"/></td>
            </tr>
    
            <tr>
                <td>{message}</td>
            </tr>
    
        </table>

        {/* {email} <br></br>
            {name} <br></br>
            {bgrp} <br></br>
            {address} <br></br>
            {dob} <br></br>
            {age} <br></br>
            {gender} <br></br> */}

        </>
    )
}

export default DonerUserRegistration