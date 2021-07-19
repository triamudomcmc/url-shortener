import React, {useContext, useEffect, useState} from 'react'
import FingerprintJS from "@fingerprintjs/fingerprintjs";

interface UserData {
  studentID: string,
  title: string,
  firstname: string,
  lastname: string,
  email: string
}

interface IAuthContext {
  onReady: ((callback: (logged: boolean, userData: UserData | null) => any) => any),
  signin: () => void,
  signout: () => void,
  reFetch: (cause?: string) => Promise<void>,
  isInit: boolean
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

  const onReady = (callback: (logged: boolean, userData: UserData | null) => any) => {
    if (userData !== null) return callback("studentID" in userData, userData)
    return {logged: false, userData: null}
  }

  const [userData, setUserData] = useState(null)
  const [prevPop, setPrevPop] = useState(null)
  const [authToken, setAuthToken] = useState(null)
  const [isInit, setInit] = useState(true)

  const reFetch = async (cause: string = "") => {
    const data = window.localStorage.getItem("data")
    if (data) {
      const parsed = JSON.parse(data)
      setUserData(parsed.data)
    }
  }

  const singoutAction = async () => {
    window.localStorage.setItem("data","")
    setUserData(null)
    window.location.reload()
  }

  const signout = () => {
    singoutAction()
  }

  const update = async () => {
    const fp = await FingerprintJS.load()
    const fingerPrint = await fp.get();

    const res = await fetch(`https://account.triamudom.club/api/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: "fetchAuthToken",
        authToken: authToken,
        reqToken: token,
        fp: fingerPrint.visitorId
      }),
      credentials: 'include'
    })

    const jsonResult = await res.json()

    if (jsonResult.status) {
      window.localStorage.setItem("data", JSON.stringify(jsonResult.data.data))
      window.location.reload()
    }
  }


  useEffect(() => {
    if (prevPop) {
      const inter = setInterval(() => {
        if (prevPop.closed) {
          update()
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
      }),
      credentials: 'include'
    })

    const jsonResult = await res.json()
    return jsonResult
  }

  const signin = () => {
    if (prevPop) {
      prevPop.close()
    }
    const wid = window.open("about:blank","_blank", "width=492,height=740")
    setPrevPop(wid)

    genToken().then(jsonResult => {
      if(jsonResult.status) {
        setAuthToken(jsonResult.data.authToken)
        wid.location.replace(`https://account.triamudom.club/auth?authToken=${jsonResult.data.authToken}`)
      }
    })
  }

  useEffect(() => {

    reFetch()

    setInit(false)
  }, [])

  return {
    onReady,
    signin,
    signout,
    reFetch,
    isInit
  }
}
