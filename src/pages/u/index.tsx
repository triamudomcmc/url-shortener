import classnames from "classnames"
import { motion } from "framer-motion"
import Image from "next/image"
import Router from "next/router"
import { useEffect, useState } from "react"
import { useAuth } from "tucmc-auth"

const Page = () => {
  const { loggedUser, signOut, signIn, loading } = useAuth()
  const [currentEditing, setCurr] = useState("")
  const [pages, setPages] = useState([])

  useEffect(() => {
    setCurr(localStorage.getItem("editPage") || "")
  }, [])

  useEffect(() => {
    localStorage.setItem("editPage", currentEditing)
  }, [currentEditing])

  useEffect(() => {
    const getPageList = async () => {
      const list = await fetch(`/api/table`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "getPageList"
        }),
        credentials: "include"
      })

      const result = await list.json()

      if (result.status) {
        setPages(result.data.pages || [])
        if (!localStorage.getItem("editPage")) {
          setCurr(result.data.pages[0])
        }
      }
    }

    if (loggedUser) {
      getPageList()
    }
  }, [loggedUser])

  return (
    <div className="font-plus-jakarta-sans h-screen w-full px-4 py-16 text-[#333E51]">
      <Image
        src={"/assets/images/portal/abg2.jpg"}
        alt=""
        fill={true}
        objectFit="fill"
      />
      <motion.div
        animate={
          loading
            ? { opacity: 1, display: "flex" }
            : { opacity: 0, display: "none" }
        }
        transition={{ duration: 0.5 }}
        className="font-noto-sans-thai fixed top-0 left-0 z-[99] flex min-h-screen w-full flex-col items-center justify-center px-6 backdrop-blur-sm"
      >
        <div className="flex items-center space-x-2">
          <h1 className="font-semibold text-gray-800">กำลังเข้าสู่ระบบ</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.3}
            stroke="currentColor"
            className="animate-dynamic-spin h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </div>
        <p className="max-w-[300px] text-center text-sm font-medium text-gray-500">
          ผู้ใช้สามารถเข้าสู่ระบบที่หน้าต่างที่เปิดขึ้น
          หากไม่พบหน้าต่างให้ลองใช้งาน browser อื่น
        </p>
      </motion.div>
      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center pb-10">
        <h1 className="text-center text-4xl font-extrabold">TUCMC Links</h1>
        <p className="text-center">
          Create your personal link portal with your <br /> preferred style with
          ease.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center">
          {!loggedUser ? (
            <>
              <button
                onClick={signIn}
                className="cursor-pointer rounded-full bg-[#F45C99] px-8 py-3 font-bold text-white shadow-md"
              >
                Login With TUCMC
              </button>
            </>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={signOut}
                className="h-10 rounded-md border-opacity-40 bg-white py-1 px-4 font-medium shadow-md"
              >
                Logout
              </button>
              <button
                onClick={() => {
                  Router.push("/u/edit")
                }}
                className="h-10 rounded-md border-opacity-40 bg-white py-1 px-4 font-medium shadow-md"
              >
                Edit
              </button>
              <div className="rounded-md border-2 border-white shadow-md">
                {pages.length > 0 ? (
                  pages.map((item, index, arr) => {
                    return (
                      <h1
                        key={index}
                        className={classnames(
                          "h-[38px] cursor-pointer px-4 py-1",
                          index === 0 && "rounded-t-md",
                          index + 1 === arr.length && "rounded-b-md",
                          currentEditing === item &&
                            "bg-[#F45C99] font-medium text-white"
                        )}
                        onClick={() => {
                          setCurr(item)
                        }}
                      >
                        {item}
                      </h1>
                    )
                  })
                ) : (
                  <h1
                    className={classnames(
                      "h-[38px] rounded-md bg-gray-200 px-4 py-1 font-medium text-gray-500"
                    )}
                  >
                    no pages
                  </h1>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className="fixed bottom-0 left-0 z-10 h-[50vh] lg:h-[50vw]"
        style={{ width: "100vw" }}
      >
        <Image
          src={"/assets/images/portal/floor.png"}
          alt="bg"
          layout="fill"
          objectPosition="100% 0"
          className={"object-cover"}
        />
      </div>
    </div>
  )
}

export default Page
