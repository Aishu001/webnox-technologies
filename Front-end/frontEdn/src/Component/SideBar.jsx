import React from 'react'
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import '../Style/Sidebar.css'

function SideBar() {
  return (
    <>
    <div className="sidebar">
      <ul>
        <li><Link to="dashboard">Dashboard</Link></li>
        <li><Link to="products">Products</Link></li>
        <li><Link to="purchase">Purchase</Link></li>
      
      </ul>
    </div>
    </>
  )
}

export default SideBar