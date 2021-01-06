import React from 'react'
import {AppProps} from 'next/app'

import '../styles/tailwind.css'
import Head from "next/head";

const UrlShortenerApp = ({Component, pageProps}: AppProps) => (
    <div className="antialiased">
        <Head>
            <title>Url Shortener</title>
        </Head>
        <Component {...pageProps} />
    </div>
)

export default UrlShortenerApp