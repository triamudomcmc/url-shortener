import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { motion } from "framer-motion"
import Image from "next/image"
import Router from "next/router"
import hash from "object-hash"
import React, { useEffect, useState } from "react"
import { useAuth } from "tucmc-auth"

import { TUCMC } from "@/components/logo/TUCMC"

import { request } from "../../lib/request"

const PageLinkEdit = ({ rawData, value, onClick }: any) => {
  return (
    <>
      {rawData}
      <div className="w-full cursor-pointer rounded-3xl border border-[#333E51] bg-white bg-opacity-50 shadow-md">
        <div className="my-1 flex h-16 flex-col justify-center px-10 text-center text-[#333E51]">
          <div className="relative mx-auto w-max px-10">
            <span>{value.title}</span>
            <span className="absolute top-1 -right-6">
              <PencilSquareIcon
                strokeWidth={2}
                stroke={"currentColor"}
                onClick={onClick}
                className="h-4 w-4 text-[#F45C99]"
              />
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

const Edit = () => {
  const [content, setContent] = useState(<></>)
  const { loggedUser } = useAuth()

  const [editing, setEditing] = useState(false)

  const [editData, setEditData] = useState({
    index: NaN,
    title: "",
    url: ""
  })
  const [hide, setHide] = useState(false)

  const initialPageData = {
    title: "",
    description: "",
    data: [],
    cache_version: ""
  }

  const [pageData, setPageData] = useState(initialPageData)

  const edit = (index: any, title: any, url: any) => {
    setEditData({
      index,
      title,
      url
    })
    setEditing(true)
  }

  const fetchPageData = async () => {
    const pageID = localStorage.getItem("editPage") || ""

    const res = await request("table", "fetchPage", {
      localCacheVersion: "",
      id: pageID
    })
    if (res.status) {
      setPageData(res.data)
    } else {
      // upate local cache
      // const localCache = localStorage.getItem(`${pageID}_cache`);
      console.error("unable to fetch page data")
      Router.push("/u")
    }
  }

  useEffect(() => {
    if (loggedUser !== null) {
      if (loggedUser !== undefined) {
        fetchPageData()
      } else {
        Router.push("/u")
      }
    }
  }, [loggedUser])

  const updateDatabase = async () => {
    const pageID = localStorage.getItem("editPage") || ""

    const res = await request("table", "updatePage", {
      pageData,
      id: pageID
    })
    if (res.status) {
      console.log("success")
    } else {
      // update cache somehow
      console.error("unable to update page data")
    }
  }

  useEffect(() => {
    setContent((prev) => {
      let rawData: JSX.Element = <></>
      let margin = false
      pageData.data.forEach((value: any, index) => {
        if (margin) {
          rawData = (
            <PageLinkEdit
              rawData={rawData}
              value={value}
              onClick={() => {
                edit(index, value.title, value.link)
              }}
            />
          )
        } else {
          rawData = (
            <PageLinkEdit
              rawData={rawData}
              value={value}
              onClick={() => {
                edit(index, value.title, value.link)
              }}
            />
          )
          margin = true
        }
      })
      return rawData
    })

    const prevHash = pageData.cache_version
    if (prevHash) {
      const cleaned = pageData.data.filter((item: any) => item.link !== "")
      const newHash = hash({
        ...{ ...pageData, data: cleaned },
        cache_version: ""
      })
      if (prevHash !== newHash) {
        updateDatabase()
      }
    }
  }, [pageData])

  const addLinkAbove = () => {
    setPageData((prevState: any) => {
      const newData = [{ title: "untitled", link: "" }, ...prevState.data]
      return { ...prevState, data: newData }
    })
  }

  const addLinkBelow = () => {
    setPageData((prevState: any) => {
      const newData = [...prevState.data, { title: "untitled", link: "" }]
      return { ...prevState, data: newData }
    })
  }

  useEffect(() => {
    setTimeout(() => {
      setHide(editing)
    }, 200)
  }, [editing])

  const shiftElement = () => {
    const conf = window.confirm("Are you sure?")
    if (conf) {
      setPageData((prevState) => {
        const newData = prevState.data.filter(
          (item, index) => index !== editData.index
        )

        return { ...prevState, data: newData }
      })
      setEditing(false)
    }
  }

  const clearEdit = () => {
    setEditing(false)
    setTimeout(() => {
      setEditData({
        index: NaN,
        title: "",
        url: ""
      })
    }, 430)
  }

  const updateList = async () => {
    if (editData.index >= 998) {
      switch (editData.index) {
        case 998:
          setPageData((prevState) => ({
            ...prevState,
            description: editData.title
          }))
          break
        case 999:
          setPageData((prevState) => ({ ...prevState, title: editData.title }))
          break
        default:
          break
      }

      setEditing(false)
      return
    }

    if (editData.index >= 0) {
      setPageData((prevState) => {
        const newData: any = [...prevState.data]
        newData[editData.index] = { title: editData.title, link: editData.url }
        return { ...prevState, data: newData }
      })
      setEditing(false)
    }
  }

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center">
      <div className="z-2 fixed top-0 left-0 h-[100vh] w-full">
        <Image
          src={"/assets/images/portal/abg2.jpg"}
          alt=""
          fill={true}
          priority={true}
          className="disabled"
          objectFit="fill"
        />
      </div>
      <div className="z-2 fixed top-0 left-0 h-[100vh] w-[550px]">
        <Image
          priority={true}
          alt=""
          src={"/assets/images/a_side_left.png"}
          layout={"fill"}
          className="disabled object-cover"
        />
      </div>
      <div className="z-2 fixed top-0 right-0 hidden h-[100vh] w-[500px] md:block">
        <Image
          alt=""
          priority={true}
          src={"/assets/images/a_side_right.png"}
          layout={"fill"}
          className="disabled object-cover"
        />
      </div>
      {hide && (
        <div className="fixed z-30 flex min-h-screen w-full items-center justify-center">
          <motion.div
            initial={{ scale: 0.1 }}
            animate={editing ? { scale: 1 } : { scale: 0.1 }}
            transition={{ duration: 0.4 }}
            className="rounded-xl border border-white border-opacity-60 bg-white bg-opacity-40 shadow-lg backdrop-blur"
          >
            <div className="flex items-center justify-between rounded-t-xl border-b border-gray-400 border-opacity-30 bg-gray-50 bg-opacity-20 py-3 px-4">
              <h1 className="font-medium text-gray-700">
                Edit current selection
              </h1>
              <div className="flex items-center justify-between space-x-2">
                {editData.index < 998 && (
                  <TrashIcon
                    strokeWidth={2.5}
                    stroke={"currentColor"}
                    onClick={shiftElement}
                    className="h-4 w-4 cursor-pointer text-gray-700"
                  />
                )}
                <XMarkIcon
                  strokeWidth={1.4}
                  stroke={"currentColor"}
                  onClick={clearEdit}
                  className="h-5 w-5 cursor-pointer text-gray-700"
                />
              </div>
            </div>
            <div className="space-y-2 px-6 pt-4 text-gray-700">
              {/* eslint-disable-next-line no-nested-ternary */}
              {editData.index < 998 ? (
                <>
                  <div className="flex items-center space-x-2">
                    <h1 className="font-medium">Title: </h1>
                    <input
                      onChange={(e) => {
                        setEditData((prevState) => ({
                          ...prevState,
                          title: e.target.value
                        }))
                      }}
                      value={editData.title}
                      className="h-8 appearance-none rounded-md border border-white bg-white bg-opacity-30 px-2"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <h1 className="font-medium">URL: </h1>
                    <input
                      onChange={(e) => {
                        setEditData((prevState) => ({
                          ...prevState,
                          url: e.target.value
                        }))
                      }}
                      value={editData.url}
                      className="h-8 appearance-none rounded-md border border-white bg-white bg-opacity-30 px-2"
                    />
                  </div>
                </>
              ) : editData.index > 998 ? (
                <div className="flex items-center space-x-2">
                  <h1 className="font-medium">Title: </h1>
                  <input
                    onChange={(e) => {
                      setEditData((prevState) => ({
                        ...prevState,
                        title: e.target.value
                      }))
                    }}
                    value={editData.title}
                    className="h-8 appearance-none rounded-md border border-white bg-white bg-opacity-30 px-2"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-start space-y-2">
                  <h1 className="font-medium">Description</h1>
                  <textarea
                    onChange={(e) => {
                      setEditData((prevState) => ({
                        ...prevState,
                        title: e.target.value
                      }))
                    }}
                    rows={6}
                    value={editData.title}
                    className="h-28 w-72 appearance-none rounded-md border border-white bg-white bg-opacity-30 px-2 py-1"
                  />
                </div>
              )}
            </div>
            <div className="my-4 px-6">
              <div
                onClick={updateList}
                className="rounded-md bg-gradient-to-tr from-[#F55A98] via-[#F586B1] to-[#FFECF4] py-2 px-4 text-center font-semibold text-white shadow-md"
              >
                Update
              </div>
            </div>
          </motion.div>
        </div>
      )}
      <div className="my-auto flex flex-col py-12">
        <motion.div
          animate={
            editing ? { scale: 0.1, opacity: 0 } : { scale: 1, opacity: 1 }
          }
          transition={{ duration: 0.4 }}
          className="max-w-[340px] rounded-3xl border border-[#333E51] bg-white bg-opacity-20 backdrop-blur md:max-w-[380px]"
        >
          <div className="item-center round-lg glass-panel flex w-full flex-col rounded-3xl">
            <div className="mx-6 mt-8 flex h-full flex-col items-center">
              <div className="relative mt-3">
                <h1 className="font-oswald text-center text-4xl font-extrabold text-[#333E51]">
                  {pageData.title}
                </h1>
                <PencilSquareIcon
                  strokeWidth={2}
                  stroke={"currentColor"}
                  onClick={() => {
                    edit(999, pageData.title, "")
                  }}
                  className="absolute top-5 -right-6 h-4 w-4 text-[#F45C99]"
                />
              </div>
              <p className="text-center text-base font-medium text-[#333E51]">
                {pageData.description}
                <PencilSquareIcon
                  strokeWidth={2}
                  stroke={"currentColor"}
                  onClick={() => {
                    edit(998, pageData.description, "")
                  }}
                  className="absolute mt-1 ml-1 inline h-4 w-4 text-[#F45C99]"
                />
              </p>

              <div className="mt-4 mb-2 w-2/5 border-b-2 border-[#333E51]"></div>

              {/* content */}
              <motion.div
                onClick={addLinkAbove}
                whileHover={{ scale: 1.1 }}
                className="mt-6 cursor-pointer rounded-full border border-[#333E51] bg-white bg-opacity-50 p-3"
              >
                <PlusIcon className="h-6 w-6 text-[#F45C99] " />
              </motion.div>

              <div className="overflow-custom font-display mt-4 w-full space-y-6 px-1 pb-12 text-base font-semibold">
                {content}
              </div>

              <motion.div
                onClick={addLinkBelow}
                whileHover={{ scale: 1.1 }}
                className="mb-6 cursor-pointer rounded-full border border-[#333E51] bg-white bg-opacity-50 p-3"
              >
                <PlusIcon className="h-6 w-6 text-[#F45C99] " />
              </motion.div>
            </div>
          </div>
        </motion.div>
        <div className="z-20 mx-auto mt-12">
          <TUCMC className="w-[184px] text-[#333E51]" />
        </div>
      </div>
    </div>
  )
}

export default Edit
