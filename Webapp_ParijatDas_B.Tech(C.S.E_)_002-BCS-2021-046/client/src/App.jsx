
import React from 'react'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import HomePage from './Pages/Home/HomePage'

import About from './Pages/about/About'
import ProductInfo from './Pages/ProductInfo/ProductInfo.jsx'
import CartPage from './Pages/cart/CartPage'
import AllProduct from './Pages/allProduct/AllProduct'
import Signup from './Pages/registration/Signup'
import Login from './Pages/registration/Login'
import UserDashBoard from './Pages/user/.UserDashBoard.jsx'
import AdminDashBoard from './Pages/admin/AdminDashBoard.jsx'
import MyContextProvider from './context/MyContextProvider.jsx'
import AddProductPage from './Pages/adminProduct/AddProductPage.jsx'
import UpdateProductPage from './Pages/adminProduct/UpdateProductPage.jsx'
import CategoryPage from './Pages/category/CategoryPage.jsx'

import {Toaster} from "react-hot-toast"
import {ProtectedRouteForUser} from './protectedRoute/ProtectedRouteForUser.jsx'
import {ProtectedRouteForAdmin} from './protectedRoute/ProtectedRouteForAdmin.jsx'


export default function App() {
  return (
    <MyContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/productinfo/:id" element={<ProductInfo/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/category/:categoryname" element={<CategoryPage />} />
          <Route path="/user" element={ <ProtectedRouteForUser>
              <UserDashBoard />
            </ProtectedRouteForUser>} />
          <Route path="/admin" element={
              <AdminDashBoard />
          } />
            <Route path="/addproduct" element={
            <ProtectedRouteForAdmin>
              <AddProductPage />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/updateproduct/:id" element={
            <ProtectedRouteForAdmin>
              <UpdateProductPage />
            </ProtectedRouteForAdmin>
          } />


          

          

          
        </Routes>
      </Router>
    </MyContextProvider>
    
  )
}
