import React from 'react'
import {AppProps} from 'next/app'

import '../styles/tailwind.css'
import Head from "next/head";

const UrlShortenerApp = ({Component, pageProps}: AppProps) => (
    <div className="antialiased">
      <Head>
        <title>URL Shortener</title>
      </Head>
        <Component {...pageProps} />
    </div>
)

export default UrlShortenerApp