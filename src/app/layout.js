"use client"

import { Provider } from "react-redux";
import "./globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import store from '@/redux/store'

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
        <Provider store={store}>
            <html lang="en">
                <body>
                    {children}
                </body>
            </html>
        </Provider>
    </ThemeProvider>
  );
}
