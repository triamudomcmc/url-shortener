import Link from "next/link";
import React, {useEffect, useState} from "react";
import {GetStaticProps} from "next";
import initialisedDB from "../handlers/firebase-admin";
import objectArray from "../types/objectArray";

export const getStaticProps: GetStaticProps = async (context) => {

  const db = initialisedDB.collection("portal")
  const data = await db.listDocuments()
  const item: objectArray = []
  for (const doc of data) {
    let row = await doc.get()
    item.push({title: row.get("title"),link: row.get("link")})
  }

  return {
    props: {data: item},
    revalidate: 1
  }

}

const links = ({ data }) => {

  const [content, setContent] = useState(<></>)

  useEffect(() => {
    document.title = "TUCMC Portal"
  },[])

  useEffect(() => {
    setContent((prev) => {
      let rawData: JSX.Element = <></>
      let margin = false
      data.forEach((value) => {
        if (margin) {
          rawData =
            <>
              {rawData}
              <div className="mt-6 content-panel w-full rounded-2xl md:rounded-3xl hover:bg-pink-50">
                <Link href={value.link}>
                  <div className="flex flex-col justify-center text-center h-14 md:h-16 my-1">
                    <h1>{value.title}</h1>
                  </div>
                </Link>
              </div>
            </>
        }else{
          rawData =
            <>
              {rawData}
              <div className="content-panel w-full rounded-2xl md:rounded-3xl hover:bg-pink-50">
                <Link href={value.link}>
                  <div className="flex flex-col justify-center text-center h-14 md:h-16 my-1">
                    <h1>{value.title}</h1>
                  </div>
                </Link>
              </div>
            </>
          margin = true
        }
      })
      return rawData
    })
  },[data])

  return (
    <div className="flex flex-col items-center w-full h-full min-h-screen mid-complex-gradient">
        <div className="flex mt-14 md:mt-28 w-4/5 h-4/5 custom-min-h max-w-md custom-max-h md:max-h-full">
          <img className="absolute w-72 md:w-auto" src="./vectors/bg.svg"/>
          <div className="flex flex-col item-center round-lg w-full glass-panel rounded-3xl">
            <div className="flex flex-col items-center mt-8 md:mt-12 mx-6 h-full md:mx-10">
              <img className="w-4/6 custom-max-w" src="./vectors/timeTab.png"/>
              <h1 className="mt-3 md:mt-6 text-center text-purple-625 font-extrabold text-2xl md:text-3xl">TUCMC Links</h1>
              <p className="text-center font-medium text-xs md:text-base text-purple-625">Discover all the
                links provided by us here :) and feel free to check them out!</p>
              <div className="mt-4 md:mt-6 border-b-2 border-purple-625 w-2/5">

              </div>
              <div className="w-full overflow-custom h-2/5 md:h-2/4 mt-4 pb-12 md:mt-6 font-semibold text-xs md:text-base font-display text-purple-625">
                {content}
              </div>
            </div>
          </div>
        </div>
        <img className="mt-10 md:mt-8 mb-8 z-10 w-44 md:w-64" src="./vectors/TUCMC.png"/>
      </div>
  )
}

export default links