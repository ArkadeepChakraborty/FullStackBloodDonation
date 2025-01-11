// import logo from './logo.svg';
// import './App.css';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   useNavigate,
//   Outlet,
// } from "react-router-dom";
// import Home from './Home';
// import Jobs from './Jobs';
// import Users from './Users';
// import Company from './Company';
// import Sidebar from './Sidebar';
// import Topbar from './Topbar';
// import Profile from './Profile';

// function App() {
//   return (
//     <>
//       <Router>
//         <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
//               <Sidebar></Sidebar>
//               {/*  Main wrapper */}
//               <div className="body-wrapper">
//                   <Topbar></Topbar>

//                   <Routes>
//                       <Route path="/" element={<Home></Home>}></Route>
//                       <Route path="/jobs" element={<Jobs></Jobs>}></Route>
//                       <Route path="/users" element={<Users></Users>}></Route>
//                       <Route path="/company" element={<Company></Company>}></Route>
//                       <Route path="/profile" element={<Profile></Profile>}></Route>
//                   </Routes>
                 
//               </div>
//         </div>
//       </Router>
//     </>
//   );
// }

// export default App;


import './App.css';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './Home';
import UsersList from './UserList';
import DonorsList from './DonorsList';
import Profile from './Profile';
import ProfileView from './ProfileView';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import AdminLogin from './AdminLogin';
import UpdateAdmin from './UpdateAdmin';
import UpdateUser from './UpdateUser';
import UpdateDonor from './UpdateDonor';
import FPAdmin from './FPAdmin';
import AdminAbout from './AdminAbout';
//import UserRequestlist from './UserRequestlist';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  // Check if the user is already logged in on page load
  useEffect(() => {
    const storedAdminData = localStorage.getItem('adminData');
    if (storedAdminData) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div>
        {/* Topbar and Sidebar only appear when logged in */}
        {isLoggedIn && <Topbar />}
        <div className="main-wrapper">
          {isLoggedIn && <Sidebar />}
          <div>
            <Routes>
              {/* Default route always points to login */}
              <Route
                path="/"
                element={
                  isLoggedIn ? <Navigate to="/home" /> : <AdminLogin setIsLoggedIn={setIsLoggedIn} />
                }
              />
              <Route
                path="/home"
                element={
                  isLoggedIn ? <Home /> : <Navigate to="/" />
                }
              />
              <Route
                path="/users"
                element={
                  isLoggedIn ? <UsersList /> : <Navigate to="/" />
                }
              />
              <Route
                path="/donors"
                element={
                  isLoggedIn ? <DonorsList /> : <Navigate to="/" />
                }
              />
              <Route
                path="/about"
                element={
                  isLoggedIn ? <AdminAbout /> : <Navigate to="/" />
                }
              />
              <Route
                path="/profile"
                element={
                  isLoggedIn ? <Profile /> : <Navigate to="/" />
                }
              />
              <Route
                path="/profile-view"
                element={
                  isLoggedIn ? <ProfileView /> : <Navigate to="/" />
                }
              />
              {/* <Route
                path="/req"
                element={
                  isLoggedIn ? <UserRequestlist/> : <Navigate to="/" />
                }
              /> */}
              <Route
                  path="/EditAdmin"
                  element={
                    isLoggedIn ? <UpdateAdmin /> : <Navigate to="/" />
                  }
                />
                <Route
                 path="/updateUser"
                 element={isLoggedIn ? <UpdateUser /> : <Navigate to="/" />}
                />
                <Route
                path="/update-donor"
                element={isLoggedIn ? <UpdateDonor /> : <Navigate to="/" />}
                />
                <Route
                path="/fpassword"
                element={<FPAdmin />}
              />
              {/* Catch-all route redirects to login */}
              <Route
                path="*"
                element={<Navigate to="/" />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;









// import './App.css';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from "react-router-dom";
// import Home from './Home';
// import UsersList from './UserList';
// import DonorsList from './DonorsList';
// import Profile from './Profile';
// import ProfileView from './ProfileView';  // Import the new ProfileView component
// import Sidebar from './Sidebar';
// import Topbar from './Topbar';
// import AdminLogin from './AdminLogin';

// function App() {
//   // Check if email is in localStorage
//   const email = localStorage.getItem('email');

//   return (
//     <Router>
//       <div>
//         {/* Conditionally render Topbar if email exists in localStorage */}
//         {email && <Topbar />}
//         <div className="main-wrapper">
//           {/* Conditionally render Sidebar if email exists in localStorage */}
//           {email && <Sidebar />}
//           <div className="">
//             <Routes>
//               {/* Add routes here for login and registration */}
//               <Route path="/" element={<AdminLogin />} />
//               <Route path="/Home" element={<Home />} />
//               <Route path="/users" element={<UsersList />} />
//               <Route path="/donors" element={<DonorsList />} />
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/profile-view" element={<ProfileView />} /> {/* Add the ProfileView route */}
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
