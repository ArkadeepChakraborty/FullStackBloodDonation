// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Css/Topbar.css';

// const Topbar = () => {
//   const [profileImage, setProfileImage] = useState(
//     localStorage.getItem('profileImage') || '../assets/images/profile/user-3.jpg'
//   );

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('profilePic', file);

//     try {
//       const response = await fetch('http://localhost:5000/upload-profile', {
//         method: 'POST',
//         body: formData,
//       });
//       const data = await response.json();

//       if (data.success) {
//         // Update state and localStorage with the new image URL
//         setProfileImage(data.imageUrl);
//         localStorage.setItem('profileImage', data.imageUrl);
//       } else {
//         alert('File upload failed');
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       alert('Error uploading file');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('adminData');
//     // localStorage.removeItem('profileImage'); // Clear uploaded profile image on logout
//     window.location.href = '/';
//   };

//   return (
//     <header>
//       <nav className="navbar">
//         <ul className="navbar-nav">
//           <li className="nav-item d-block d-xl-none">
//             <a className="nav-link sidebartoggler nav-icon-hover" id="headerCollapse" href="#!">
//               <i className="ti ti-menu-2" />
//             </a>
//           </li>
//         </ul>

//         <div className="navbar-collapse">
//           <div className="brand-container">
//             <h3 className="brand-name">Blood Donation Admin</h3>
//           </div>

//           <ul className="navbar-nav flex-row ms-auto align-items-center">
//             <li className="nav-item dropdown">
//               <a
//                 className="nav-link nav-icon-hover"
//                 href="#!"
//                 id="drop2"
//                 data-bs-toggle="dropdown"
//                 aria-expanded="false"
//               >
//                 <img
//                   src={profileImage}
//                   alt="profile"
//                   width={35}
//                   height={35}
//                   style={{ borderRadius: '50%' }}
//                 />
//               </a>
//               <div
//                 className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
//                 aria-labelledby="drop2"
//               >
//                 <div className="message-body">
//                   <Link to="/profile-view" className="d-flex align-items-center gap-2 dropdown-item">
//                     <i className="ti ti-user fs-6" />
//                     <p className="mb-0 fs-3">My Profile</p>
//                   </Link>

//                   {/* Upload Button */}
//                   <div className="dropdown-item">
//                     <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
//                       <i className="ti ti-upload fs-6" />
//                       <p className="mb-0 fs-3" style={{ display: 'inline', marginLeft: '8px' }}>
//                         Upload Profile Picture
//                       </p>
//                     </label>
//                     <input
//                       id="file-upload"
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageUpload}
//                       style={{ display: 'none' }}
//                     />
//                   </div>

//                   <button
//                     onClick={handleLogout}
//                     className="btn btn-outline-primary mx-1 mt-1 d-block"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Topbar;



import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Css/Topbar.css';

const Topbar = () => {

  const [profileImage, setprofileImage] = useState('')

  const getData = async () => {
      const response = await fetch("http://localhost:5000/admin/getAllAdmins");
      const data = await response.json();
      setprofileImage(data[0].profileImage)
    };
  
    useEffect(() => {
      getData();
    }, []);

  const handleLogout = () => {
    // Clear session or local storage data if stored
    localStorage.removeItem('adminData');  // Assuming you store admin data in localStorage
    
    // Optionally, clear other session-related data or states here

    // Redirect to login page after logout
    window.location.href = '/'; // Use window.location.href to redirect to login page
  };

  return (
    <header>
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="nav-item d-block d-xl-none">
            <a
              className="nav-link sidebartoggler nav-icon-hover"
              id="headerCollapse"
              href="#!"
            >
              <i className="ti ti-menu-2" />
            </a>
          </li>
        </ul>

        <div className="navbar-collapse">
          {/* Add name above SEODash */}
          <div className="brand-container">
            <h3 className="brand-name">Blood Donation Admin</h3> {/* Replace "John Doe" with the desired name */}
          </div>

          <ul className="navbar-nav flex-row ms-auto align-items-center">
            <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon-hover"
                href="#!"
                id="drop2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={ profileImage || "https://via.placeholder.com/150"}
                  alt="profile"
                  width={35}
                  height={35}
                />
              </a>
              <div
                className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                aria-labelledby="drop2"
              >
                <div className="message-body">
                  {/* My Profile Link */}
                  <Link
                    to="/profile-view"
                    className="d-flex align-items-center gap-2 dropdown-item"
                  >
                    <i className="ti ti-user fs-6" />
                    <p className="mb-0 fs-3">My Profile</p>
                  </Link>

                  {/* Update Profile Link */}
                  {/* <Link
                  to="/update-profile"
                  className="d-flex align-items-center gap-2 dropdown-item"
                  >
                  <i className="ti ti-pencil fs-6" />
                  <p className="mb-0 fs-3">Update Profile</p>
                  </Link> */}

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-primary mx-1 mt-1 d-block"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Topbar;


