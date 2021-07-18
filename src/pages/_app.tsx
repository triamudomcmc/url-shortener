import React from 'react'
import {AppProps} from 'next/app'

import '../styles/tailwind.css'
import Head from "next/head";
import {AuthProvider} from "../handlers/auth";

const UrlShortenerApp = ({Component, pageProps}: AppProps) => (
    <div className="antialiased">
      <Head>
        <title>URL Shortener</title>
      </Head>
      <AuthProvider token="thXDDst3qrnYCjVIB1ayPaalOVbiNaiHSl4BN6av56AjzZB">
        <Component {...pageProps} />
      </AuthProvider>
    </div>
)

export default UrlShortenerApp