import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

export default function Layout({children}) {
  return (
    <div>
      <Navbar />
      <div className="maincontent min-h-screen">
        {children}
      </div>
      <Footer />
    </div>
  )
}
