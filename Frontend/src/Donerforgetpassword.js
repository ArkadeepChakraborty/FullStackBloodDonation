import { useState } from "react"
import './App.css'
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Donerforgetpassword(){

    const [email, setEmail] = useState('')
    const[message, setMessage] = useState('')
    const[newpassword, setNewpassword] = useState('')
    const [cpassword, setCpassword] = useState('')


    const [flag, setFlag] = useState(0);
    const [flago, setFlago] = useState(0);
    const [flaga, setFlaga] = useState(0);

    const validateEmail = async () =>{
        const new_user =  {
            "email": email
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_user)
        };

        const response = await fetch('http://localhost:5000/doner/checkEmail', requestOptions);
        const data = await response.json();

        if(data.length > 0)
        {
            setEmail(data[0].email)
            setFlag(1)
            
        }
        else
        {
            setMessage("Sorry Your Email is Not Registered, Try Again")
        }
    }

const updatePassword = async () =>{
    // alert("update")
    const new_user =  {
        "password": newpassword
    }

    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new_user)
    };

    if(newpassword == cpassword){
        const response = await fetch('http://localhost:5000/doner/updateUserByEmail/' + email, requestOptions);
    const data = await response.json();

    console.log(52, data)
    if (data._id != null) {
        setMessage("Password Updated Successfully")
        window.location.href = "/doner"

    }
    else {
        setMessage("Password Not Updated, Try Again")
    }
    }
    else{
        setMessage("Password and Confirm Password are not same")
    }
}

const showHideo = (id) =>{
    setFlago(flago === 0 ? 1 : 0);
    
}
const showHide = (id) =>{
    setFlaga(flaga === 0 ? 1 : 0);
}

    return(
        <>

        {
            flag == 0?
            <>
            <table>
            <tr>
                <th style={{color: 'red'}}>Forget Password</th>
            </tr>
            <tr>
                <td><b>Enter Email Id :</b></td>
                <td ><input type="email" name="" placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)}/></td>
            </tr> 
            
            <tr>
                <td><input type="Submit" value="Submit" onClick={validateEmail}/></td>
            </tr>

            <tr>
                <td >{message}</td>
            </tr>

    
        </table>
        </>
        :
        <>
        <table>
        <tr>
                <td><b>Enter new password :</b></td>
                {/* <td ><input type="password" name="" placeholder="Enter new password" onChange={(e) => setNewpassword(e.target.value)}/></td> */}
                {
                    flago === 0 ? 
                    <>
                    <td style={{ position: 'relative' }}><input type="password" name="" placeholder="Enter new password" onChange={(e) => setNewpassword(e.target.value)}/></td>
                     <td><button onClick={showHideo} style={{ marginRight : '35px'}}><FaEye /></button></td>
                    </>
                    
                    :
                    <>
                    <td style={{ position: 'relative' }}><input type="text" name="" placeholder="Enter new password" value={newpassword} onChange={(e) => setNewpassword(e.target.value)}/></td>
                    <td><button onClick={showHideo} style={{ marginRight : '35px'}}><FaEyeSlash /></button></td>

                    </>
                }
            </tr> 

            <tr>
                <td><b>Confirm your password :</b></td>
                {/* <td ><input type="password" name="" placeholder="Re-enter your password" onChange={(e) => setCpassword(e.target.value)}/></td> */}
                {
                    flaga === 0 ? 
                    <>
                    <td style={{ position: 'relative' }}><input type="password" name="" placeholder="Re-enter your password" onChange={(e) => setCpassword(e.target.value)}/></td>
                     <td><button onClick={showHide} style={{ marginRight : '35px'}}><FaEye /></button></td>
                    </>
                    
                    :
                    <>
                    <td style={{ position: 'relative' }}><input type="text" name="" placeholder="Re-enter your password" value={cpassword}  onChange={(e) => setCpassword(e.target.value)}/></td>
                    <td><button onClick={showHide} style={{ marginRight : '35px'}}><FaEyeSlash /></button></td>

                    </>
                }
            </tr> 
            
            <tr>
                <td><input type="Submit" value="Change now" onClick={updatePassword}/></td>
            </tr>
            <tr>
                <td >{message}</td>
            </tr>
        </table>
        </>
        }

        </>
    )
}

export default Donerforgetpassword