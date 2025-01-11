import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

function BloodyUserRegistration() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [bloodgroup, setBloodgroup] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');
    const [message, setMessage] = useState('');

    const register = async () => {
        const new_user = {
            name: name,
            email: email,
            password: password,
            address: address,
            contact: contact,
            bloodgroup: bloodgroup,
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_user),
        };

        const response = await fetch('http://localhost:5000/user/registerUser', requestOptions);
        const data = await response.json();

        if (data._id != null) {
            setMessage("Registration Successfully");
            toast.success("Registration Successful!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                window.location.href = "/user";
            }, 3000);
        } else {
            setMessage("Registration Failed");
            toast.error("Registration Failed!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <>
            <ToastContainer />
            <table>
                <tr>
                    <th style={{ color: 'black' }}>User's Registration</th>
                </tr>
                <tr>
                    <td>Enter Your Name</td>
                    <td>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            onChange={(e) => setName(e.target.value)}
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
                        />
                    </td>
                </tr>
                <tr>
                    <td>Enter Blood group</td>
                    <td>
                        <input
                            type="name"
                            placeholder="Enter Blood group"
                            onChange={(e) => setBloodgroup(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Enter your contact no</td>
                    <td>
                        <input
                            type="number"
                            placeholder="Enter your contact no"
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Enter Your Address</td>
                    <td>
                        <textarea
                            type="text"
                            placeholder="Enter Address"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Enter password</td>
                    <td>
                        <input
                            type="password"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input onClick={register} type="Submit" value="Register" />
                    </td>
                </tr>
                <tr>
                    <td>{message}</td>
                </tr>
            </table>
        </>
    );
}

export default BloodyUserRegistration;
