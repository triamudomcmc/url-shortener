import React, {useEffect, useState} from "react";
import {request} from "../../../lib/request";
import {PencilIcon, TrashIcon} from "@heroicons/react/outline";
import {PlusIcon, XIcon} from "@heroicons/react/solid";
import {motion} from "framer-motion";
import hash from "object-hash"
import {useAuth} from "../../../handlers/auth";
import Router from "next/router";

const Edit = () => {

  const [content, setContent] = useState(<></>)
  const {userData} = useAuth()

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

  const fetchPageData = async () => {
    const pageID = localStorage.getItem("editPage") || ""

    const res = await request("table", "fetchPage", {localCacheVersion: "", id: pageID})
    if (res.status) {
      setPageData(res.data)
    }
  }

  useEffect(() => {
    if (userData !== null) {
      if (userData !== undefined) {
        fetchPageData()
      } else {
        Router.push("/u")
      }
    }
  }, [userData])

  const updateDatabase = async () => {
    const pageID = localStorage.getItem("editPage") || ""

    const res = await request("table", "updatePage", {pageData: pageData, id: pageID})
    if (res.status) {
      console.log("scuse")
    }
  }

  useEffect(() => {
    setContent((prev) => {
      let rawData: JSX.Element = <></>
      let margin = false
      pageData.data.forEach((value, index) => {
        if (margin) {
          rawData =
            <>
              {rawData}
              <div className="mt-6 w-full rounded-2xl content-panel md:rounded-3xl">
                <div className="flex flex-col justify-center my-1 h-14 text-center md:h-16">
                  <div className="relative mx-auto w-max">
                    <span>{value.title}</span>
                    <span className="absolute top-0.5 md:top-1 -right-4 md:-right-6">
                      <PencilIcon onClick={() => {
                        edit(index, value.title, value.link)
                      }} className="w-3 h-3 text-blue-600 md:w-4 md:h-4"/>
                    </span>
                  </div>
                </div>
              </div>
            </>
        } else {
          rawData =
            <>
              {rawData}
              <div className="w-full rounded-2xl content-panel md:rounded-3xl">
                <div className="flex flex-col justify-center my-1 h-14 text-center md:h-16">
                  <div className="relative mx-auto w-max">
                    <span>{value.title}</span>
                    <span className="absolute top-0.5 md:top-1 -right-4 md:-right-6">
                      <PencilIcon onClick={() => {
                        edit(index, value.title, value.link)
                      }} className="w-3 h-3 text-blue-600 md:w-4 md:h-4"/>
                    </span>
                  </div>
                </div>
              </div>
            </>
          margin = true
        }
      })
      return rawData
    })

    const prevHash = pageData.cache_version
    if (prevHash) {
      const cleaned = pageData.data.filter(item => (item.link !== ""))
      const newHash = hash({...{...pageData, data: cleaned}, cache_version: ""})
      if (prevHash !== newHash) {
        updateDatabase()
      }
    }
  }, [pageData])

  const addLink = () => {
    setPageData(prevState => {
      const newData = [...prevState.data, {title: "untitled", link: ""}]
      return {...prevState, data: newData}
    })
  }

  useEffect(() => {
    setTimeout(() => {
      setHide(editing)
    }, 200)
  }, [editing])

  const edit = (index, title, url) => {
    setEditData({
      index: index, title: title, url: url
    })
    setEditing(true)
  }

  const shiftElement = () => {

    const conf = confirm("Are you sure?")
    if (conf) {
      setPageData(prevState => {
        const newData = prevState.data.filter((item, index) => (index !== editData.index))

        return {...prevState, data: newData}
      })
      setEditing(false)
    }
  }

  const clearEdit = () => {
    setEditing(false)
    setEditData({
      index: NaN,
      title: "",
      url: ""
    })
  }

  const updateList = async () => {
    if (editData.index >= 998) {

      switch (editData.index) {
        case 998:
          setPageData(prevState => ({...prevState, description: editData.title}))
          break
        case 999:
          setPageData(prevState => ({...prevState, title: editData.title}))
      }

      setEditing(false)
      return
    }

    if (editData.index >= 0) {
      setPageData(prevState => {
        let newData = [...prevState.data]
        newData[editData.index] = {title: editData.title, link: editData.url}
        return {...prevState, data: newData}
      })
      setEditing(false)
    }
  }

  return (
    <div className="flex flex-col items-center w-full h-full min-h-screen mid-complex-gradient">
      {hide && <div className="flex fixed z-30 justify-center items-center w-full min-h-screen">
          <motion.div initial={{scale: 0.1}} animate={editing ? {scale: 1} : {scale: 0.1}} transition={{duration: 0.4}}
                      className="bg-white bg-opacity-40 rounded-xl border border-white border-opacity-60 shadow-lg">
              <div
                  className="flex justify-between items-center py-3 px-4 bg-gray-50 bg-opacity-20 rounded-t-xl border-b border-gray-400 border-opacity-30">
                  <h1 className="font-medium text-gray-700">Edit current selection</h1>
                  <div className="flex space-x-2 justify-between items-center">
                    {editData.index < 998 && <TrashIcon onClick={shiftElement} className="w-4 h-4 text-gray-700"/>}
                      <XIcon onClick={clearEdit} className="w-4 h-4 text-gray-700"/>
                  </div>
              </div>
              <div className="px-6 pt-4 space-y-2 text-gray-700">
                {editData.index < 998 ? <>
                  <div className="flex items-center space-x-2">
                    <h1 className="font-medium">Title: </h1>
                    <input onChange={e => {
                      setEditData(prevState => ({...prevState, title: e.target.value}))
                    }} value={editData.title} className="px-2 h-8 bg-white bg-opacity-30 rounded-md border border-white appearance-none"/>
                  </div>
                  <div className="flex items-center space-x-2">
                    <h1 className="font-medium">URL: </h1>
                    <input onChange={e => {
                      setEditData(prevState => ({...prevState, url: e.target.value}))
                    }} value={editData.url} className="px-2 h-8 bg-white bg-opacity-30 rounded-md border border-white appearance-none"/>
                  </div>
                </> : editData.index > 998 ? <div className="flex items-center space-x-2">
                  <h1 className="font-medium">Title: </h1>
                  <input onChange={e => {
                    setEditData(prevState => ({...prevState, title: e.target.value}))
                  }} value={editData.title} className="px-2 h-8 bg-white bg-opacity-30 rounded-md border border-white appearance-none"/>
                </div> : <div className="flex flex-col items-start space-y-2">
                  <h1 className="font-medium">Description</h1>
                  <textarea onChange={e => {
                    setEditData(prevState => ({...prevState, title: e.target.value}))
                  }} rows={6} value={editData.title} className="px-2 py-1 w-72 h-28 bg-white bg-opacity-30 rounded-md border border-white appearance-none"/>
                </div>}
              </div>
              <div className="px-6 mt-4 mb-4">
                  <div onClick={updateList}
                       className="py-2 px-4 font-medium text-center text-white bg-gradient-to-tr from-blue-300 to-purple-400 rounded-md shadow-md">
                      Update
                  </div>
              </div>
          </motion.div>
      </div>}
      <motion.div animate={editing ? {scale: 0.1, opacity: 0} : {scale: 1, opacity: 1}} transition={{duration: 0.4}}
                  className="flex mt-14 w-4/5 max-w-md h-4/5 md:mt-28 custom-min-h custom-max-h md:max-h-full">
        <div className="flex flex-col w-full rounded-3xl item-center round-lg glass-panel">
          <div className="flex flex-col items-center mx-6 mt-8 h-full md:mt-12 md:mx-10">
            <img className="w-4/6 custom-max-w" src="/vectors/timeTab.png"/>
            <div className="relative mt-3 md:mt-6">
              <h1 className="text-2xl font-extrabold text-center text-purple-625 md:text-3xl">{pageData.title}</h1>
              <PencilIcon onClick={() => {
                edit(999, pageData.title, "")
              }} className="top-3 -right-6 absolute w-3 h-3 text-blue-600 md:w-4 md:h-4"/>
            </div>
            <p className="text-xs font-medium text-center md:text-base text-purple-625">{pageData.description}<PencilIcon
              onClick={() => {
                edit(998, pageData.description, "")
              }} className="inline absolute mt-1 ml-1 w-3 h-3 text-blue-600 md:w-4 md:h-4"/></p>
            <div className="mt-4 w-2/5 border-b-2 md:mt-6 border-purple-625">

            </div>
            <div
              className="px-1 pb-5 mt-4 w-full h-2/5 text-xs font-semibold overflow-custom md:h-2/4 md:mt-6 md:text-base font-display text-purple-625">
              {content}
            </div>
            <motion.div onClick={addLink} whileHover={{scale: 1.1}} className="py-3 px-3 mb-6 bg-white bg-opacity-50 rounded-full cursor-pointer">
              <PlusIcon className="w-6 h-6 text-blue-600"/>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <img className="z-10 mt-10 mb-8 w-44 md:mt-8 md:w-64" src="/vectors/TUCMC.png"/>
    </div>
  )
}

export default Edit