import { useState } from "react";
import './App.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2'; // Import SweetAlert2

function DonerUser() {

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [message, setMessage] = useState('');

    const [flag, setFlag] = useState(0);

    const navigate = useNavigate(); 

    const loginUser = async () => {
        const new_doner = {
            "email": email,
            "password": password,
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_doner)
        };

        const response = await fetch('http://localhost:5000/doner/loginDoner', requestOptions);
        const data = await response.json();

        if (data.message === true) {
            localStorage.setItem("loggedDoner", email);
            setMessage("Login Successfully");

            // Display SweetAlert2 notification
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'See your details now!',
                confirmButtonText: 'Proceed'
            }).then(() => {
                // Redirect after alert is closed
                window.location.href = "/list";
            });
        } else {
            setMessage("Login Failed");

            // Display SweetAlert2 notification for failure
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid email or password.',
                confirmButtonText: 'Try Again'
            });
        }
    };

    const showHide = () => {
        setFlag(prevFlag => (prevFlag === 0 ? 1 : 0));
    };

    return (
        <>
            <table>
                <tr>
                    <th style={{ color: 'black', textAlign: 'center' }}>Doner Login</th>
                </tr>
                <tr>
                    <td style={{ color: 'yellow' }}><b>Enter your email</b></td>
                    <td><input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} /></td>
                </tr>
                <tr>
                    <td style={{ color: 'yellow' }}><b>Enter your password</b></td>
                    {
                        flag === 0 ?
                            <>
                                <td style={{ position: 'relative' }}><input type="password" placeholder="Enter password" onChange={(e) => setpassword(e.target.value)} /></td>
                                <td><button onClick={showHide} style={{ marginRight: '35px' }}><FaEye /></button></td>
                            </>
                            :
                            <>
                                <td style={{ position: 'relative' }}><input type="text" placeholder="Enter password" onChange={(e) => setpassword(e.target.value)} /></td>
                                <td><button onClick={showHide} style={{ marginRight: '35px' }}><FaEyeSlash /></button></td>
                            </>
                    }
                </tr>

                <tr>
                    <td colSpan="2">
                        <button 
                            style={{ 
                                backgroundColor: '#007bff', 
                                color: 'white', 
                                border: 'none', 
                                padding: '5px 10px', 
                                borderRadius: '5px', 
                                cursor: 'pointer', 
                                fontWeight: 'bold', 
                                marginTop: '10px' 
                            }} 
                            onClick={loginUser}
                        >
                            Login
                        </button>
                    </td>
                </tr>

                <tr>
                    <td colSpan="2" style={{ color: message === "Login Successfully" ? 'green' : 'red', textAlign: 'center' }}>{message}</td>
                </tr>

                <tr>
                    <td colSpan="2" style={{ textAlign: 'center' }}>
                        <Link to="/doneruser" style={{ color: 'black', display: 'block', marginBottom: '5px' }}><b>New Doner?</b></Link>
                        <Link to="/fgdoner" style={{ color: 'black' }}><b>Forget Password?</b></Link>
                    </td>
                </tr>
            </table>
        </>
    );
}

export default DonerUser;
