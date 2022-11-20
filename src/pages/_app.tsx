import React from "react";
import { AppProps } from "next/app";

import "../styles/tailwind.css";
import Head from "next/head";
import { AuthProvider } from "tucmc-auth";

const UrlShortenerApp = ({ Component, pageProps }: AppProps) => (
  <div className="antialiased">
    <AuthProvider TOKEN="kXESrRXnpMQqR75byvrWg8wB7tZNqNGwb43xwCkFG9Vt" options={{routes: {
        fetch: "api/table"
        }, handlers: {
        signOut: async () => {
            await fetch(`/api/table`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: "destroyCookie"
                }),
                credentials: 'include'
            })
        }
        }}}>
      <Component {...pageProps} />
    </AuthProvider>
  </div>
);

export default UrlShortenerApp;
