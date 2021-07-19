import {useEffect, useState} from "react";
import {useAuth} from "../handlers/auth";

const Playground = () => {

  const {SigninWithTUCMC, userData, signout} = useAuth()

  return (
      <div className="ml-10 mt-10">
        {userData ? <button onClick={signout}>Logout</button> : <SigninWithTUCMC/>}

        <p>{userData && userData.email}</p>
      </div>
  )
}

export default Playground