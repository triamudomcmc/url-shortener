import "../styles/global.css"

import { Antonio, Noto_Sans_Thai, Plus_Jakarta_Sans } from "@next/font/google"
import type { AppProps } from "next/app"
import { AuthProvider } from "tucmc-auth"

const antonio = Antonio({ subsets: ["latin"] })
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] })
const notoSansThai = Noto_Sans_Thai()

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <style jsx global>{`
        .font-antonio {
          font-family: ${antonio.style.fontFamily};
        }
        .font-plus-jakarta-sans {
          font-family: ${plusJakartaSans.style.fontFamily};
        }
        .font-noto-sans-thai {
          font-family: ${notoSansThai.style.fontFamily};
        }
      `}</style>
      <AuthProvider TOKEN="xLsBlg9lr6d9IGIO18UxdvVwgHgwm1d9iR7ZVeEaoJeF">
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default MyApp
