import "../styles/global.css"

import type { AppProps } from "next/app"

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <main className="">
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
