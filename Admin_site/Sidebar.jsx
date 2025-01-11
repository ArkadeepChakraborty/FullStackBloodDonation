// import React from 'react'
// import { Link } from 'react-router-dom'

// const Sidebar = () => {
//   return (
//     <>
//     {/* Sidebar Start */}
//     <aside className="left-sidebar">
//                 {/* Sidebar scroll*/}
//                 <div>
//                 <div className="brand-logo d-flex align-items-center justify-content-between">
//                     <a href="./index.html" className="text-nowrap logo-img">
//                     <img src="../assets/images/logos/logo-light.svg" alt />
//                     </a>
//                     <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
//                     <i className="ti ti-x fs-8" />
//                     </div>
//                 </div>
//                 {/* Sidebar navigation*/}
//                 <nav className="sidebar-nav scroll-sidebar" data-simplebar>
//                     <ul id="sidebarnav">
                    
//                         <li className="sidebar-item">
//                             <Link className="sidebar-link" to="/" aria-expanded="false">
//                             <span>
//                                 <iconify-icon icon="solar:home-smile-bold-duotone" className="fs-6" />
//                             </span>
//                             <span className="hide-menu">Dashboard</span>
//                             </Link>
//                         </li>
                        
//                         <li className="sidebar-item">
//                             <Link className="sidebar-link" to="/jobs" aria-expanded="false">
//                             <span>
//                                 <iconify-icon icon="solar:layers-minimalistic-bold-duotone" className="fs-6" />
//                             </span>
//                             <span className="hide-menu">Jobs</span>
//                             </Link>
//                         </li>
//                         <li className="sidebar-item">
//                             <Link className="sidebar-link" to="/users" aria-expanded="false">
//                             <span>
//                                 <iconify-icon icon="solar:danger-circle-bold-duotone" className="fs-6" />
//                             </span>
//                             <span className="hide-menu">Users</span>
//                             </Link>
//                         </li>
//                         <li className="sidebar-item">
//                             <Link className="sidebar-link" to="/company" aria-expanded="false">
//                             <span>
//                                 <iconify-icon icon="solar:bookmark-square-minimalistic-bold-duotone" className="fs-6" />
//                             </span>
//                             <span className="hide-menu">Company</span>
//                             </Link>
//                         </li>
//                         <li className="sidebar-item">
//                             <Link className="sidebar-link" to="/profile" aria-expanded="false">
//                             <span>
//                                 <iconify-icon icon="solar:file-text-bold-duotone" className="fs-6" />
//                             </span>
//                             <span className="hide-menu">Profile</span>
//                             </Link>
//                         </li>
//                     </ul>
//                     <div className="unlimited-access hide-menu bg-primary-subtle position-relative mb-7 mt-7 rounded-3">
                    
//                     </div>
//                 </nav>
//                 {/* End Sidebar navigation */}
//                 </div>
//                 {/* End Sidebar scroll*/}
//             </aside>
//             {/*  Sidebar End */}
//     </>
//   )
// }

// export default Sidebar



import React from 'react';
import { Link } from 'react-router-dom';
//import './Sidebar.css'; // Assuming you have a CSS file for sidebar styling

const Sidebar = () => {
  return (
    <>
      {/* Sidebar Start */}
      <aside className="left-sidebar">
        {/* Sidebar scroll */}
        <div>
          <div className="brand-logo d-flex align-items-center justify-content-between">
            <a href="/" className="text-nowrap logo-img">
              {/* Replace with your logo file */}
              <img src="/assets/images/logos/logo-light.svg" alt="Logo" />
            </a>
            <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
              <i className="ti ti-x fs-8" />
            </div>
          </div>
          {/* Sidebar navigation */}
          <nav className="sidebar-nav scroll-sidebar" data-simplebar>
            <ul id="sidebarnav">
              {/* Dashboard */}
              <li className="sidebar-item">
                <Link className="sidebar-link" to="/" aria-expanded="false">
                  <span>
                    <iconify-icon icon="solar:home-smile-bold-duotone" className="fs-6" />
                  </span>
                  <span className="hide-menu">Dashboard</span>
                </Link>
              </li>

              {/* Donors */}
              <li className="sidebar-item">
                <Link className="sidebar-link" to="/donors" aria-expanded="false">
                  <span>
                    <iconify-icon icon="solar:layers-minimalistic-bold-duotone" className="fs-6" />
                  </span>
                  <span className="hide-menu">Donors</span>
                </Link>
              </li>

              {/* Users */}
              <li className="sidebar-item">
                <Link className="sidebar-link" to="/users" aria-expanded="false">
                  <span>
                    <iconify-icon icon="solar:danger-circle-bold-duotone" className="fs-6" />
                  </span>
                  <span className="hide-menu">Users</span>
                </Link>
              </li>

              {/* About */}
              <li className="sidebar-item">
                <Link className="sidebar-link" to="/about" aria-expanded="false">
                  <span>
                    <iconify-icon icon="solar:danger-circle-bold-duotone" className="fs-6" />
                  </span>
                  <span className="hide-menu">About</span>
                </Link>
              </li>

              {/* Request List */}
              {/* <li className="sidebar-item">
                <Link className="sidebar-link" to="/req" aria-expanded="false">
                  <span>
                    <iconify-icon icon="solar:danger-circle-bold-duotone" className="fs-6" />
                  </span>
                  <span className="hide-menu">Request List</span>
                </Link>
              </li> */}

              {/* Profile */}
              <li className="sidebar-item">
                <Link className="sidebar-link" to="/profile" aria-expanded="false">
                  <span>
                    <iconify-icon icon="solar:file-text-bold-duotone" className="fs-6" />
                  </span>
                  <span className="hide-menu">Profile</span>
                </Link>
              </li>
            </ul>
          </nav>
          {/* End Sidebar navigation */}
        </div>
      </aside>
      {/* Sidebar End */}
    </>
  );
};

export default Sidebar;
