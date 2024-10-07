import { useState } from 'react'

import { BrowserRouter as Router, Route, Routes,Navigate   } from "react-router-dom"
import Home from './Component/Home'
import Login from './Component/Login'
import SignUp from './Component/SignUp'
import Dashboard from './Component/Dashboard'
import Layout from './Component/Layout'
import Products from './Component/Products'
import AddProduct from './Component/AddProduct'
import EditProduct from './Component/EditProduct'
import Purchase from './Component/Purchase'



function App() {


  return (
    <>
<Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/editProduct/:id" element={<EditProduct />} />
        
      {/* Layout route with nested routes */}
      <Route path="/*" element={<Layout/>}>
          <Route index element={<Navigate to="dashboard" />} /> {/* Redirect to dashboard */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products/>} />
          <Route path="purchase" element={<Purchase/>} />
          {/* Add more nested routes here */}
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App


