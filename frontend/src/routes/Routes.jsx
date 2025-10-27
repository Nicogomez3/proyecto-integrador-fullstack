import React from 'react'
import { BrowserRouter, Routes as ReactDomRoutes, Route } from 'react-router-dom'
import { Layout } from '../Components/Layout/Layout'
import Home from '../Pages/Home/Home'
import { About } from '../Pages/About/About'
import { Contact } from '../Pages/Contact/Contact'
import { Products } from '../Pages/Products/Products'
import Checkout from '../Pages/Checkout/Checkout'
import Register from '../Pages/Register/Register'
import Login from '../Pages/Login/Login'
import ProtectedRoute from '../Components/ProtectedRoute/ProtectedRoute'
import Order from '../Pages/Order/Order'
import Congratulations from '../Pages/Congratulations/Congratulations'
import NotFound from '../Pages/NotFound/NotFound'



function Routes()  {
  return (
    <BrowserRouter>
        <Layout>
            <ReactDomRoutes>
                <Route path="/" element={<Home />} />
                {/* Nosotros */}
                <Route path="/About" element={<About />} />
                {/* Contacto */}
                <Route path="/Contact" element={<Contact />} />
                {/* Productos */}
                <Route path="/Products" element={<Products />} />
                {/* Checkout */}
                <Route path='/checkout' element={
                    <ProtectedRoute redirectTo={'/register'}>
                        <Checkout />
                    </ProtectedRoute>
                } />
               
                {/* 404 not found */}
                <Route path="*" element={<NotFound />} />
                {/* Register */}
                <Route path="/register" element={<Register />} /> 
                {/* Login */}
                <Route path="/login" element={<Login />} />

                {/* orders */}
                 <Route path="/order" element={<Order />} /> 
                {/* Congrats  */}
                <Route path="/congratulations" element={<Congratulations />} />
            </ReactDomRoutes>
        </Layout>
    </BrowserRouter>
  )
}

export default Routes
