import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import CssBaseline from '@mui/material/CssBaseline'; // Import the CssBaseline component

import Navbar from "./NavBar";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DOA Platform',
  description: 'DOA System under development',
}

import React, { PropsWithChildren } from "react";


const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {/* Add the CssBaseline component to override the 8px margin */}
      <CssBaseline />
      <Navbar />
      <div className="container">{children}</div>
      
    </>
  );
};

export default Layout;