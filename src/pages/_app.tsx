import "../styles/global.css"

import {
  Antonio,
  Noto_Sans_Thai,
  Oswald,
  Plus_Jakarta_Sans
} from "@next/font/google"
import type { AppProps } from "next/app"
import { AuthProvider } from "tucmc-auth"

const antonio = Antonio({ subsets: ["latin"] })
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] })
const notoSansThai = Noto_Sans_Thai()
const oswald = Oswald({ subsets: ["latin"] })

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
        .font-oswald {
          font-family: "cooper-black-std", serif;
        }
      `}</style>
      <AuthProvider
        TOKEN="xLsBlg9lr6d9IGIO18UxdvVwgHgwm1d9iR7ZVeEaoJeF"
        options={{
          routes: {
            fetch: "/api/table"
          },
          handlers: {
            signOut: async () => {
              await fetch(`/api/table`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  action: "destroyCookie"
                }),
                credentials: "include"
              })
            }
          }
        }}
      >
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default MyApp
