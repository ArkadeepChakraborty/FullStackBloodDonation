// //import { useState } from "react"
// // import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import {
//     BrowserRouter as Router,
//     Routes,
//     Route,
//     Link,
// } from "react-router-dom";

// import './App.css'
// import Homeone from "./Homeone";
// import DonerUser from "./DonerUser";
// import Search from "./Search";
// import Footer1 from "./Footer1"
// import BloodUser from "./Blooduser";
// import BloodyUserRegistration from "./BloodyUserRegistration";
// import DonerUserRegistration from "./DonerUserRegistration";
// import Donerlist from "./Donerlist";
// import Userlist from "./Userlist";
// import BDEdit from "./BDEdit";
// import BDUserEdit from "./BDUserEdit";
// import Usersearch from "./Usersearch";
// import { useEffect, useState } from "react";
// // import UserForgetPassword from './UserForgetPassword';
// // import Donerforgetpassword from './Donerforgetpassword';
// import Fgpassword from './Fgpassword';
// import Dfgpassword from './Dfgpassword';
// import Payment from './Payment';


// function Main(){

//     const [flag, setFlag] = useState(0)
//     //const navigate = useNavigate(); 

//     useEffect(() =>{
//         if(localStorage.getItem('loggedUser'))
//         {
//             setFlag(1)
//         }
//         if(localStorage.getItem('loggedDoner'))
//             {
//                 setFlag(1)
//             }
//     }, [])


//     const logout = () =>{
//         localStorage.removeItem('loggedUser')
//         localStorage.removeItem('loggedDoner')
//         //navigate to again login page
//         window.location.href = "/"
//     }

//     return(
//         <>
//         <Router>
        
//         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//             <a className="navbar-brand" href="#">
//                 <img src="images/blood vector one.jpg" alt="" width={30} height={24}/>
//                 <b> Blood Donation</b>
//             </a>
//             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                 <span className="navbar-toggler-icon" />
//             </button>
//             <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                 <ul className="navbar-nav mr-auto">
//                 {/* <li className="nav-item active">
//                     <Link className="nav-link" to="/home">Home</Link>
//                 </li>
                
//                 <li className="nav-item">
//                     <Link className="nav-link" to="/search">Search Doner</Link>
//                 </li>
//                 <li className="nav-item">
//                     <Link className="nav-link" to="/list">Donerlist</Link>
//                 </li>
//                 <li className="nav-item">
//                     <Link className="nav-link" to="/list2">Userlist</Link>
//                 </li>
//                 <li className="nav-item">
//                     <Link className="nav-link" to="/usearch">Search User</Link>
//                 </li> */}
//                 {
//                     flag == 1 ?
//                     <>
//                     <li className="nav-item">
//                     <Link className="nav-link" to="/search">Search Doner</Link>
//                 </li>
//                 <li className="nav-item">
//                     <Link className="nav-link" to="/list">Donerlist</Link>
//                 </li>
//                 <li className="nav-item">
//                     <Link className="nav-link" to="/list2">Userlist</Link>
//                 </li>
//                 <li className="nav-item">
//                     <Link className="nav-link" to="/usearch">Search User</Link>
//                 </li>
//                 <li className="nav-item">
//                     <a className="nav-link" onClick={logout}>Logout</a>
//                 </li>
//                     </>
//                     :
//                     <>
//                         <li className="nav-item active">
//                           <Link className="nav-link" to="/">Home</Link>
//                          </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/user">User</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/doner">Doner</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/cpayment">Charity Payment</Link>
//                         </li>
//                     </>
//                 }
                
                
//                 </ul>
//                 {/* <form className="form-inline my-2 my-lg-0">
//                 <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
//                 <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
//                 </form> */}
//             </div>
//             </nav>

//             <Routes>
//                 {/* <Route exact path="/"  element={<BloodUser/>}></Route> */}
//                 <Route exact path="/"  element={<Homeone />}></Route>
//                 <Route exact path="/user"  element={<BloodUser />}></Route>
//                 <Route exact path="/doner"  element={<DonerUser />}></Route>
//                 <Route exact path="/search"  element={<Search />}></Route>
//                 <Route exact path="/newuser"  element={<BloodyUserRegistration />}></Route>
//                 <Route exact path="/doneruser"  element={<DonerUserRegistration/>}></Route>
//                 <Route exact path="/list"  element={<Donerlist/>}></Route>
//                 <Route exact path="/list2"  element={<Userlist/>}></Route>
//                 <Route exact path="/EditDoner"  element={<BDEdit/>}></Route>
//                 <Route exact path="/EditUser"  element={<BDUserEdit/>}></Route>
//                 <Route exact path="/usearch"  element={<Usersearch />}></Route>
//                 {/* <Route exact path="/forgetuser"  element={<UserForgetPassword />}></Route> */}
//                 {/* <Route exact path="/forgetuserdoner"  element={<Donerforgetpassword />}></Route> */}
//                 <Route exact path="/fuser"  element={<Fgpassword />}></Route>
//                 <Route exact path="/fgdoner"  element={<Dfgpassword />}></Route>
//                 <Route exact path="/cpayment"  element={<Payment />}></Route>


//             </Routes>


//         </Router>

    
//         <Footer1></Footer1>
//         </>
        
//     )
    
// }
// export default Main


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import './App.css'
import { FaSignOutAlt } from "react-icons/fa";
import Homeone from "./Homeone";
import DonerUser from "./DonerUser";
import Search from "./Search";
import Footer1 from "./Footer1"
import BloodUser from "./Blooduser";
import BloodyUserRegistration from "./BloodyUserRegistration";
import DonerUserRegistration from "./DonerUserRegistration";
import Donerlist from "./Donerlist";
import Userlist from "./Userlist";
import BDEdit from "./BDEdit";
import BDUserEdit from "./BDUserEdit";
import Usersearch from "./Usersearch";
//import { useEffect, useState } from "react";
// import UserForgetPassword from './UserForgetPassword';
// import Donerforgetpassword from './Donerforgetpassword';
import Fgpassword from './Fgpassword';
import Dfgpassword from './Dfgpassword';
import Payment from './Payment';
import Bloods from "./Bloods";
import About from "./About.";
import Requestlist from "./Requestlist";
import DonorRequestlist from "./DonorRequestlist";



function Main() {
    const [flag, setFlag] = useState(0);
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const loggedUser = localStorage.getItem("loggedUser");
        const loggedDoner = localStorage.getItem("loggedDoner");
    
        if (loggedUser) {
            setFlag(1);
            setUserType("user");
            toast.success("Welcome Back, User!");
        } else if (loggedDoner) {
            setFlag(1);
            setUserType("donor");
            toast.success("Welcome Back, Donor!");
        }
        else {
            setFlag(0);
            toast.info("Welcome back to our website!");
        }
    }, []);
    

    const logout = () => {
        localStorage.removeItem('loggedUser');
        localStorage.removeItem('loggedDoner');
        window.location.href = "/"; // Redirect to home
    };

    return (
        <Router>
        <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#" style={{marginRight:'60px'}}>
                    <img src="images/blood vector one.jpg" alt="" width={30} height={24} />
                    <b> Blood Donation</b>
                </a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {flag === 1 && userType === 'user' && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/list2">User Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/search">Search Doner</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/request1">Blood Requests</Link>
                                </li>
                            </>
                        )}
                        {flag === 1 && userType === 'donor' && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/list">Donor Profile</Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link className="nav-link" to="/usearch">Search User</Link>
                                </li> */}
                                <li className="nav-item">
                                    <Link className="nav-link" to="/request2">Pending Requests</Link>
                                </li>

                            </>
                        )}
                        {flag === 0 && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about">About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/user">User</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/doner">Doner</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/bloods">Need Bloods</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/cpayment">Charity Payment</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    {flag === 1 && (
                        <button className="btn btn-danger ml-auto" onClick={logout}>
                            <FaSignOutAlt />
                        </button>
                    )}
                </div>
            </nav>

            <Routes>
            <Route exact path="/"  element={<Homeone />}></Route>
            <Route path="/about" element={<About />} />
               <Route exact path="/user"  element={<BloodUser />}></Route>
              <Route exact path="/doner"  element={<DonerUser />}></Route>
               <Route exact path="/search"  element={<Search />}></Route>
               <Route exact path="/newuser"  element={<BloodyUserRegistration />}></Route>
               <Route exact path="/doneruser"  element={<DonerUserRegistration/>}></Route>
              <Route exact path="/list"  element={<Donerlist/>}></Route>
               <Route exact path="/list2"  element={<Userlist/>}></Route>
               <Route exact path="/EditDoner"  element={<BDEdit/>}></Route>
               <Route exact path="/EditUser"  element={<BDUserEdit/>}></Route>
               <Route exact path="/usearch"  element={<Usersearch />}></Route>
               <Route exact path="/fuser"  element={<Fgpassword />}></Route>
                <Route exact path="/fgdoner"  element={<Dfgpassword />}></Route>
               <Route exact path="/cpayment"  element={<Payment />}></Route>
               <Route exact path="/bloods"  element={<Bloods />}></Route>
               <Route exact path="/request1"  element={<Requestlist />}></Route>
               <Route exact path="/request2"  element={<DonorRequestlist />}></Route>
            </Routes>

            <Footer1 />
        </Router>
    );
}

export default Main;

