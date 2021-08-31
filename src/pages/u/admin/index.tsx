import {useAuth} from "../../../handlers/auth";
import {useEffect, useState} from "react";
import Router from "next/router";
import classnames from "classnames";

const Page = () => {
  const {SigninWithTUCMC, userData, signout} = useAuth()
  const [currentEditing, setCurr] = useState("")

  useEffect(() => {
    setCurr(localStorage.getItem("editPage"))
  }, [])

  useEffect(() => {
    localStorage.setItem("editPage", currentEditing)
  }, [currentEditing])

  return (
    <div className="mid-complex-gradient p-12 h-screen">
      <div className="py-10 px-16 w-10/12 md:w-3/4 rounded-3xl glass-panel mx-auto">
        <h1 className="text-3xl font-bold text-purple-625 mb-4 text-center">Login to edit your page</h1>
        <div className="flex flex-col items-center justify-center">
          {!userData ? <SigninWithTUCMC/> : <div className="flex space-x-2">
            <button onClick={signout} className="h-10 py-1 px-4 rounded-md bg-white shadow-md border border-gray-700 border-opacity-40">Logout</button>
            <button onClick={() => {Router.push("/u/admin/edit")}} className="h-10 py-1 px-4 rounded-md bg-white shadow-md border border-gray-700 border-opacity-40">Edit</button>
            <div className="border border-gray-700 border-opacity-40 rounded-md">
              {userData.pages?.map((item, index, arr) => {
                return <h1 key={index} className={classnames("cursor-pointer px-4 py-1", index === 0 ? "rounded-t-md" : index + 1 === arr.length && "rounded-b-md", currentEditing === item && "bg-blue-400 text-white font-medium")} onClick={() => {
                  setCurr(item)
                }}>{item}</h1>
              })}
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Page