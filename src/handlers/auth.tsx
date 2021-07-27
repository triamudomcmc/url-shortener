import React, {useContext, useEffect, useState} from 'react'
import FingerprintJS from "@fingerprintjs/fingerprintjs";

interface UserData {
  studentID: string,
  title: string,
  firstname: string,
  lastname: string,
  email: string,
  pages: Array<string>
}

interface IAuthContext {
  SigninWithTUCMC: () => JSX.Element,
  signout: () => void,
  reFetch: () => void,
  userData: UserData | null | undefined
}

const AuthContext = React.createContext<IAuthContext | null>(null)

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({children, token}) => {

  const auth = useProvideAuth(token)

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

function useProvideAuth(token) {

  const [prevPop, setPrevPop] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)


  const reFetch = () => {
    const data = localStorage.getItem("data")
    if (data) {
      const parsed = JSON.parse(data)
      setUserData(parsed.data)
    }else{
      setUserData(undefined)
    }
  }

  const SigninWithTUCMC = () => {
    return (
      <button onClick={signin} style={{
        backgroundImage: "linear-gradient(to right, #a78bfa, #ec4899, #ef4444)",
        color: "rgba(255, 255, 255, 1)",
        padding: loading ? "0.14rem 4.71rem" : "0.5rem 2rem",
        fontWeight: 600,
        borderRadius: "0.375rem",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        border: "none",
      }}>{
        loading ? <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                       style={{margin: "auto", shapeRendering: "auto",width: "40px", height: "32px"}} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <circle cx="84" cy="50" r="10" fill="#ffffff">
            <animate attributeName="r" repeatCount="indefinite" dur="0.7142857142857142s" calcMode="spline" keyTimes="0;1" values="10;0"
                     keySplines="0 0.5 0.5 1" begin="0s"/>
            <animate attributeName="fill" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1"
                     values="#ffffff;#ffffff;#ffffff;#ffffff;#ffffff" begin="0s"/>
          </circle>
          <circle cx="16" cy="50" r="10" fill="#ffffff">
            <animate attributeName="r" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"
                     values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"/>
            <animate attributeName="cx" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"
                     values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"/>
          </circle>
          <circle cx="50" cy="50" r="10" fill="#ffffff">
            <animate attributeName="r" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"
                     values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.7142857142857142s"/>
            <animate attributeName="cx" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"
                     values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.7142857142857142s"/>
          </circle>
          <circle cx="84" cy="50" r="10" fill="#ffffff">
            <animate attributeName="r" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"
                     values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.4285714285714284s"/>
            <animate attributeName="cx" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"
                     values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.4285714285714284s"/>
          </circle>
          <circle cx="16" cy="50" r="10" fill="#ffffff">
            <animate attributeName="r" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"
                     values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-2.142857142857143s"/>
            <animate attributeName="cx" repeatCount="indefinite" dur="2.8571428571428568s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"
                     values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-2.142857142857143s"/>
          </circle>
        </svg>: "Login with TUCMC"
      }</button>
    )
  }

  useEffect(() => {
    reFetch()
  }, [])

  const signout = async () => {
    window.localStorage.setItem("data","")
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
    reFetch()
  }

  const fetchToken = async () => {
    const fp = await FingerprintJS.load()
    const fingerPrint = await fp.get();

    const res = await fetch(`/api/table`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: "validateToken",
        authToken: window.sessionStorage.getItem("authToken"),
        reqToken: token,
        fp: fingerPrint.visitorId
      }),
      credentials: 'include'
    })

    const jsonResult = await res.json()

    if (jsonResult.status) {
      window.sessionStorage.setItem("authToken", "")
      window.localStorage.setItem("data", JSON.stringify(jsonResult.data))
      window.localStorage.setItem("editPage", jsonResult.data.data.pages[0])
      reFetch()
    }
    setLoading(false)
  }

  useEffect(() => {
    if (prevPop) {
      const inter = setInterval(() => {
        if (prevPop.closed) {
          fetchToken()
          clearInterval(inter)
        }
      }, 500)
    }
  }, [prevPop])

  const genToken = async () => {
    const fp = await FingerprintJS.load()
    const fingerPrint = await fp.get();

    const res = await fetch(`https://account.triamudom.club/api/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: "genAuthToken",
        reqToken: token,
        fp: fingerPrint.visitorId
      })
    })

    return await res.json()
  }

  const signin = () => {
    if (loading) return;
    if (prevPop) {
      prevPop.close()
    }
    const data = window.localStorage.getItem("data")
    if(data) return
    setLoading(true)

    const wid = window.open("https://account.triamudom.club/auth","_blank", "width=492,height=740")
    setPrevPop(wid)

    genToken().then(jsonResult => {
      if(jsonResult.status) {
        window.sessionStorage.setItem("authToken", jsonResult.data.authToken)
        wid.location.replace(`https://account.triamudom.club/auth?authToken=${jsonResult.data.authToken}`)
      }
    })
  }

  return {
    SigninWithTUCMC,
    signout,
    reFetch,
    userData
  }
}
