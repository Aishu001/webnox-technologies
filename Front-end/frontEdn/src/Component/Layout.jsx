import React from 'react'
import SideBar from './SideBar';
import '../Style/Layout.css'
import { Outlet } from 'react-router-dom'; 

function Layout({ children }) {
    return (
      <div className="layout">
     <SideBar/>
        <main className="content">
       {/* {children} */}
<Outlet/>
        </main>
      </div>
    );
  }
  

export default Layout