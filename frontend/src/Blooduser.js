import { useState } from "react"
import './App.css'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";


function BloodUser(){

    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const[message, setMessage] = useState('')

    const [flag, setFlag] = useState(0)
   
    const navigate = useNavigate(); 
    
    const loginUser = async () =>{
        const new_user =  {
            "email": email,
            "password": password,
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_user)
        };

        const response = await fetch('http://localhost:5000/user/loginUser', requestOptions);
        const data = await response.json();

        if(data.message == true)
        {
            localStorage.setItem("loggedUser", email)
            setMessage("Login Successfully")
            //navigate to dashboard or home page
            window.location.href = "/search"
            //navigate('/usearch');
        }
        else
        {
            setMessage("Login Failed")
        }
    }

    const showHide = (id) =>{
        if(flag == 0)
        {
            setFlag(1)
        }
        else{
            setFlag(0)
        }
    }

    return(
        <>

        <table>
            <tr>
                <th style={{color: 'black'}}>User Login</th>
            </tr>
            <tr>
                <td style={{color: 'blue'}}><b>Enter your email</b></td>
                <td><input type="email" name="" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/></td>
            </tr>
            <tr>
            <td style={{color: 'blue'}}><b>Enter your password</b></td>
                {
                    flag == 0 ? 
                    <>
                    <td style={{ position: 'relative' }}><input type="password" name="" placeholder="Enter password" onChange={(e) => setpassword(e.target.value)}/></td>
                     <td><button onClick={showHide} style={{ marginRight : '35px'}}><FaEye /></button></td>
                    </>
                    
                    :
                    <>
                    <td style={{ position: 'relative' }}><input type="text" name="" placeholder="Enter password" onChange={(e) => setpassword(e.target.value)}/></td>
                    <td><button onClick={showHide} style={{ marginRight : '35px'}}><FaEyeSlash /></button></td>

                    </>
                }
                {/* <td><button onClick={showHide}>ShowHide</button></td> */}
            </tr>
            
            <tr>
                <td><input type="Submit" value="Login" onClick={loginUser}/></td>
            </tr>

            <tr>
                <td>{message}</td>
            </tr>

            <tr>
                <td>
                {/* <td style={{color: 'black'}}><b>New User?</b> */}
                  <Link to="/newuser" style={{color: 'black'}}><b>New User?</b></Link> <br></br>
                  {/* <Link to="/forgetuser" style={{color: 'black'}}><b>Forget Password?</b></Link>  */}
                  <Link to="/fuser" style={{color: 'black'}}><b>Forget Password?</b></Link> 
                  </td>
            </tr>

        
    
        </table>

        </>
    )
}

export default BloodUser
           

      