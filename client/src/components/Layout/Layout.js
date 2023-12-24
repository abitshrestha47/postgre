import React from 'react'
import Header from './Header';
import { Toaster } from 'react-hot-toast';

const Layout = ({children}) => {
  return (
    <div>
        <Header/>
        <main style={{minHeight:'70vh'}}>{children}</main>
        <Toaster/>
    </div>
  )
}

export default Layout;