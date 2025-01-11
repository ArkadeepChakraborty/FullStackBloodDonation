import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2'; // Import SweetAlert2
import 'react-toastify/dist/ReactToastify.css';
import './Css/AdminLogin.css';

function AdminLogin({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    toast.info("Welcome! Please log in to continue.");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Display SweetAlert notification
        Swal.fire({
          icon: 'success',
          title: 'Logged in Successfully!',
          text: 'Welcome to the admin dashboard.',
          confirmButtonText: 'Proceed',
        }).then(() => {
          // Successful login actions
          setIsLoggedIn(true);
          localStorage.setItem('email', email);
          navigate('/home');
        });
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Admin Login</h1>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <div className="forget-password-container">
        <p>Forget Password? 
          <Link to="/fpassword" className="forget-password-link">
            Click here
          </Link>
        </p>
      </div>

      <ToastContainer
        closeButton={false}
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default AdminLogin;








// import React, { useState } from 'react';
// import './Css/AdminLogin.css';
// import { useNavigate } from 'react-router-dom';

// const AdminLogin = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState(''); // State to hold error message
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/admin/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Store the admin data in localStorage
//         localStorage.setItem('email', formData.email); // Store email in localStorage
//         setError(''); // Clear error message
//         alert(data.message);
//         // Redirect to the home page
//         navigate('/Home');
//       } else {
//         setError(data.message || 'Invalid email or password');
//       }
//     } catch (error) {
//       console.error('Error logging in:', error);
//       setError('An error occurred while logging in.');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h1>Admin Login</h1>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleLogin();
//         }}
//       >
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           placeholder="Enter your email"
//           required
//         />

//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           value={formData.password}
//           onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//           placeholder="Enter your password"
//           required
//         />

//         <button type="submit" className="login-button">Login</button>
//         {error && <p className="error-message">{error}</p>} {/* Display error message */}
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;
