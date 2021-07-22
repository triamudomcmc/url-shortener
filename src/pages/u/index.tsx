import {useAuth} from "../../handlers/auth";
import {useEffect} from "react";
import Router from "next/router";

const Page = () => {
  const {SigninWithTUCMC, userData, signout} = useAuth()

  return (
    <div>
      <h1>Sign-in to edit your page</h1>
      {!userData ? <SigninWithTUCMC/> : <div className="space-x-2">
        <button onClick={signout} className="py-1 px-4 rounded-md bg-white shadow-md border border-gray-700 border-opacity-40">Logout</button>
        <button onClick={() => {Router.push("/u/edit")}} className="py-1 px-4 rounded-md bg-white shadow-md border border-gray-700 border-opacity-40">Edit</button>
      </div>}
    </div>
  )
}

export default Page