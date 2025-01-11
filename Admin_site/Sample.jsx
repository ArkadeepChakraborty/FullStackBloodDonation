import React from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Home from './Home'

const Sample = () => {
  return (
    <>
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
            <Sidebar></Sidebar>
            {/*  Main wrapper */}
            <div className="body-wrapper">
                <Topbar></Topbar>
                <Home></Home>
            </div>
        </div>

    </>
  )
}

export default Sample
