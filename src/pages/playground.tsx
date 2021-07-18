import {useEffect, useState} from "react";
import {useAuth} from "../handlers/auth";

const Playground = () => {

  const {signin, signout, onReady} = useAuth()

  const {userData, logged} = onReady((logged, userData) => {
    return {userData, logged}
  })

  return (
      <div className="ml-10 mt-10">
        {
          logged ? <button onClick={signout} className="bg-white px-4 py-1 rounded-md shadow-md">Logout</button> : <button onClick={signin} className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white px-8 py-2 font-semibold rounded-md text-sm">Login with TUCMC</button>
        }
        <div>
          <span>{userData && userData.email}</span>
        </div>
      </div>
  )
}

export default Playground