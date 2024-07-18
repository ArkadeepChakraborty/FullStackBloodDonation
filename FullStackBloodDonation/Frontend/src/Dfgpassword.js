import { useState } from "react"
import './App.css'
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Dfgpassword(){

    const [email, setEmail] = useState('')
    const[message, setMessage] = useState('')
    const[newpassword, setNewpassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const[OTP, setOTP] = useState('')
    const [userOTP, setUserOTP] = useState('')
    const [attempts, setAttempts] = useState(0); 
    const maxAttempts = 3;


    const [flag, setFlag] = useState(0);
    const [flago, setFlago] = useState(0);
    const [flaga, setFlaga] = useState(0);
    const [flagc, setFlagc] = useState(0);

    const validateEmail = async () =>{
        const x = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
        setOTP(x)
        const new_doner =  {
            "email": email, 
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_doner)
        };

        const response = await fetch('http://localhost:5000/doner/send-email/'+x, requestOptions);
        const data = await response.json();

        console.log(34, data.message)

        if(data.message  === "1")
        {
            setEmail(email)
            setFlag(1)
            
        }
        else if(data.message === "0")
            {
                setMessage("Mail Not Sent")
            }
        else
        {
            setMessage("Sorry Your Email is Not Registered, Try Again")
        }
    }

    const validateOTP = () =>{
        console.log("OTP: "+OTP+" "+"User OTP: "+userOTP)
        if(userOTP == OTP)
        {
            setFlag(2)
        }
        else{
            setMessage("OTP Not Matched, Try Again...!!!")
            setAttempts(attempts + 1);
            if (attempts + 1 >= maxAttempts) {
                // window.location.href = "/doner";
                setFlag(0)
            }
        }
    }

    const updatePassword = async () =>{
        // alert("update")
        const new_doner =  {
            "password": newpassword
        }
    
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_doner)
        };
    
        if(newpassword == cpassword){
            const response = await fetch('http://localhost:5000/doner/updateUserByEmail/' + email, requestOptions);
        const data = await response.json();
    
        console.log(52, data)
        if (data._id != null) {
            setMessage("Password Updated Successfully")
            window.location.href = "/user"
    
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

const showHidec = (id) =>{
    setFlagc(flagc === 0 ? 1 : 0);
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
                <td><input type="Submit" value="Send OTP" onClick={validateEmail}/></td>
            </tr>

            <tr>
                <td >{message}</td>
            </tr>

    
        </table>
        </>
        : flag == 1?
        <>
         <table>
            <tr>
                <th style={{color: 'red'}}>Enter OTP</th>
            </tr>
            <tr>
                <td><b>Enter Your OTP:</b></td>
                {/* <td ><input type="email" name="" placeholder="Enter your OTP " onChange={(e) => setUserOTP(e.target.value)}/></td> */}
                {
                    flagc === 0 ? 
                    <>
                    <td style={{ position: 'relative' }}><input type="password" name="" placeholder="Enter your OTP " onChange={(e) => setUserOTP(e.target.value)}/></td>
                     <td><button onClick={showHidec} style={{ marginRight : '85px'}}><FaEye /></button></td>
                    </>
                    :
                    <>
                    <td style={{ position: 'relative' }}><input type="text" name="" placeholder="Enter your OTP " onChange={(e) => setUserOTP(e.target.value)}/></td>
                    <td><button onClick={showHidec} style={{ marginRight : '85px'}}><FaEyeSlash /></button></td>

                    </>
                }
            </tr> 
            
            <tr>
                <td><input type="Submit" value="Submit" onClick={validateOTP}/></td>
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

export default Dfgpassword