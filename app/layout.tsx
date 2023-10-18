"use client";
import type { Metadata } from 'next'
import { dm_sans } from './fonts'
import { Provider } from "react-redux";
import store from "../redux/store";
import CssBaseline from '@mui/material/CssBaseline'; // Import the CssBaseline component
import Navbar from "../components/NavBar";
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/Theme';

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DOA Cost of Cultivation Reporting System',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={dm_sans.className}>
        {/* Wrap the application in the 'ThemeProvider' component to provide access to the theme styles. */}
        <ThemeProvider theme={theme}>
          {/* Wrap the application in the 'Provider' component to provide access to the Redux store. */}
          <Provider store={store}>
            {/* Add the CssBaseline component to override the 8px margin */}
            <CssBaseline />
            {/* Add navigation bar */}
            <Navbar />
            <div className="container" style={{ padding: "20px" }}>
              {children}
            </div>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
