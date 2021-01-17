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
    revalidate: 10
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
      data.forEach((value) => {
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
      })
      return rawData
    })
  },[data])

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen mid-complex-gradient">
        <div className="flex mt-4 md:mt-10 w-4/5 h-4/5 max-w-md custom-max-h md:max-h-full">
          <img className="absolute w-72 md:w-auto" src="./vectors/bg.svg"/>
          <div className="flex flex-col item-center round-lg w-full glass-panel rounded-3xl">
            <div className="mt-12 md:mt-16 mx-6 h-full md:mx-10">
              <h1 className="text-center text-purple-600 font-extrabold text-3xl md:text-4xl">TUCMC Links</h1>
              <p className="mt-8 md:mt-12 text-center font-semibold text-xs md:text-base text-gray-500">Discover all the
                links provided by us here :) and feel free to check them out!</p>
              <div className="w-full overflow-custom h-3/5 md:h-3/5 mt-2 pb-8 md:mt-14 font-semibold text-xs md:text-base font-display text-gray-700">
                {content}
              </div>
            </div>
          </div>
        </div>
        <img className="mt-10 md:mt-8 mb-8 z-10" src="./vectors/TUCMC.svg"/>
      </div>
  )
}

export default links