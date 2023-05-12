import Image from "next/image"
import { useRouter } from "next/router"
import hash from "object-hash"
import React, { useEffect, useState } from "react"

import { TUCMC } from "@/components/logo/TUCMC"
import PageLink from "@/components/PageLinks"
import { request } from "@/lib/request"

const Link = () => {
  const initialPageData = {
    title: "",
    description: "",
    data: [],
    cache_version: ""
  }

  const [pageData, setPageData] = useState(initialPageData)

  const router = useRouter()

  const fetchPageData = async () => {
    const { id } = router.query
    if (id) {
      // load local cache
      const localCache = localStorage.getItem(`${id}_cache`)
      let localCacheVersion = null

      if (localCache) {
        const parsedLocalCache = JSON.parse(localCache)
        if ("cache_version" in parsedLocalCache) {
          localCacheVersion = parsedLocalCache.cache_version
          setPageData(parsedLocalCache)
          const localCacheHash = hash({
            ...parsedLocalCache,
            cache_version: ""
          })
          if (localCacheHash !== parsedLocalCache.cache_version) {
            localCacheVersion = null
            localStorage.setItem(`${id}_cache`, "")
            setPageData(initialPageData)
          }
        }
      }

      const res = await request("table", "fetchPage", {
        id,
        localCacheVersion: localCacheVersion || ""
      })
      if (res.status) {
        if (res.data.cache_version) {
          localStorage.setItem(`${id}_cache`, JSON.stringify(res.data))
          setPageData(res.data)
        }
      }
    }
  }

  useEffect(() => {
    fetchPageData()
  }, [router.query])

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center">
      <div className="z-2 fixed top-0 left-0 h-[100vh] w-full">
        <Image
          src={"/assets/images/portal/abg2.jpg"}
          alt=""
          fill={true}
          className="disabled"
          priority={true}
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
      <div className="my-auto flex flex-col py-12">
        <div className="max-w-md rounded-3xl border border-[#333E51] bg-white bg-opacity-20 backdrop-blur">
          <div className="relative z-10 mx-auto mt-2 flex max-w-[348px] md:max-w-[380px]">
            <div className="item-center round-lg flex w-full flex-col rounded-3xl">
              <div className="mx-6 mt-8 flex h-full flex-col items-center">
                <h1 className="font-oswald mt-3 text-center text-4xl font-extrabold text-[#333E51]">
                  {pageData.title}
                </h1>
                <p className="text-center text-base font-medium text-[#333E51]">
                  {pageData.description}
                </p>
                <div className="mt-4 mb-2 w-2/5 border-b-2 border-[#333E51]"></div>
                <div className="overflow-custom font-display mt-4 w-full space-y-6 px-1 pb-12 text-base font-semibold">
                  {pageData.data.map((value: any, index) => {
                    return (
                      <PageLink
                        key={`${index}-l`}
                        link={value.link}
                        title={value.title}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="z-20 mx-auto mt-12">
          <TUCMC className="disabled w-[184px] text-[#333E51]" />
        </div>
      </div>
    </div>
  )
}

export default Link
