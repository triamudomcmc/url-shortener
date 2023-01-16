import type { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Router, { useRouter } from "next/router"
import React, { useEffect } from "react"

import { getFirestore } from "@/lib/firebase-admin"

// trash

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.URLid)
    return {
      props: {},
      notFound: true
    }

  const firestore = getFirestore()
  const db = firestore.collection("locations").doc(params.URLid.toString())
  const URLbase = await db.get()
  let URLtarget: string

  if (URLbase.exists) {
    URLtarget = URLbase.get("target")
  } else {
    URLtarget = "error"
  }

  return {
    props: { target: URLtarget, title: URLbase.get("title") || null },
    revalidate: URLtarget === "error" ? 1 : 2 * 60 * 60
  }
}

const Page = ({ target, title }: any) => {
  const router = useRouter()

  useEffect(() => {
    if (!router.isFallback) {
      if (target !== "error") {
        // @ts-ignore
        window.gtag("event", "short_link_click", {
          event_category: "short_link_click",
          event_label: title,
          link: target
        })
        Router.push(target)
      }
      if (title) {
        document.title = title
      }
    }
  }, [router.isFallback])

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>Loading...</title>
        </Head>
        <div>Loading...</div>
      </>
    )
  }

  if (target !== "error") {
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <p>{title}</p>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Invalid Link</title>
      </Head>
      <p>Invalid Link</p>
    </>
  )
}

export default Page
