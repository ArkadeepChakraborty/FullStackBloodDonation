import React, { useState } from "react";
import './Css/FPAdmin.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";

function FPAdmin() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [userOtp, setUserOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [step, setStep] = useState(0); // 0: Email, 1: OTP, 2: Password Reset
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    

    const sendOtp = async () => {
        const generatedOtp = Math.floor(100000 + Math.random() * 900000);
        console.log("Generated OTP:", generatedOtp); // Log to verify OTP generation
        setOtp(generatedOtp); // Store OTP in state
    
        const response = await fetch(`http://localhost:5000/admin/send-otp/${generatedOtp}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        if (data.message.includes('successfully')) {
            setMessage("OTP sent to your email.");
            setStep(1);
        } else {
            setMessage(data.message);
        }
    };
    

    const validateOtp = () => {
        console.log("Generated OTP:", otp);
        console.log("User Entered OTP:", userOtp.trim()); // Trim spaces
    
        if (String(otp) === String(userOtp.trim())) {
            setMessage("OTP validated successfully.");
            setStep(2);
        } else {
            setMessage("Invalid OTP. Try again.");
        }
    };
    
    
    

    const resetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
    
        const response = await fetch(`http://localhost:5000/admin/update-password/${email}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: newPassword })
        });
        const data = await response.json();
        setMessage(data.message);
    
        if (data.message.includes('successfully')) {
            setStep(0);
            setTimeout(() => {
                window.location.href = '/login'; // Redirect to /login after 2 seconds
            }, 2000);
        }
    };
    

    return (
        <div className="containero">
            <h2>Admin Password Reset</h2>
            {message && <p style={{ color: "red" }}>{message}</p>}

            {step === 0 && (
                <>
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={sendOtp}>Send OTP</button>
                </>
            )}

            {step === 1 && (
                <>
                    <label>Enter OTP:</label>
                    <input
                        type="text"
                        placeholder="Enter the OTP"
                        onChange={(e) => setUserOtp(e.target.value)}
                    />
                    <button onClick={validateOtp}>Validate OTP</button>
                </>
            )}

                    {step === 2 && (
                        <>
                            <label>New Password:</label>
                                <div className="input-containero">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <br />
                                <div className="but">
                                <button
                                    type="button"
                                    className="eye-button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                                </div>
                            </div>

                            <label>Confirm Password:</label>
                            <div className="input-containero">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm new password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            /> 
                            <br />
                            <div className="but">
                            <button
                                type="button"
                                className="eye-button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            </div>
                        </div>


                            <button onClick={resetPassword}>Reset Password</button>
                        </>
                    )}

        </div>
    );
}

export default FPAdmin;
