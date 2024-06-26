"use client";
import type { Metadata } from 'next'
import { dm_sans } from './fonts'
import { Provider } from "react-redux";
import store from "../redux/store";
import CssBaseline from '@mui/material/CssBaseline'; // Import the CssBaseline component
import Navbar from "../components/NavBar";
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/Theme';
import { metadata } from '@/data/metadata'; // Import the metadata constant
import { I18nextProvider } from 'react-i18next'; // Import I18nextProvider
import i18n from '../app/config/i18n'; // Import your i18n instance
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const inter = Inter({ subsets: ['latin'] })

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
            {/* Wrap the application with I18nextProvider */}
            <I18nextProvider i18n={i18n}>
              {/* Add the CssBaseline component to override the 8px margin */}
              <CssBaseline />
              <ToastContainer />
              {/* Add navigation bar */}
              <Navbar />
              <div className="container">
                {children}
              </div>
            </I18nextProvider>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
